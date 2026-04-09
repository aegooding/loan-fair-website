// Playwright tests for the Loan Fair enquiry form
// Run with: npx playwright test
// By default tests run against the live site (BASE_URL below).
// To test locally, change BASE_URL to 'http://localhost:5173'

import { test, expect } from '@playwright/test'

const BASE_URL = 'https://www.loanfair.com.au'

// ─── Helpers ────────────────────────────────────────────────────────────────

// Generate a unique test email for each run so submissions are identifiable
function randomEmail() {
  const id = Math.random().toString(36).slice(2, 10)
  return `test-${id}@loanfair.com.au`
}

// Open the enquiry modal by clicking the first "Enquire Now" button
async function openModal(page) {
  await page.goto(BASE_URL)
  await page.getByRole('button', { name: /enquire now/i }).first().click()
  await expect(page.getByRole('dialog', { name: 'What are you looking for?' })).toBeVisible()
}

// Click a toggle-group pill button by its label text
async function selectToggle(page, label) {
  await page.getByRole('button', { name: label }).click()
}

// ─── Happy path: Car loan ────────────────────────────────────────────────────

test('happy path — car loan enquiry submits successfully', async ({ page }) => {
  const email = randomEmail()
  await openModal(page)

  // Step 1 — Loan type
  await selectToggle(page, 'Car loan')
  await page.getByRole('button', { name: /next/i }).click()

  // Step 2 — The basics
  await page.getByLabel(/loan amount/i).fill('25000')
  await selectToggle(page, 'New / Demo')
  await page.getByRole('button', { name: /next/i }).click()

  // Step 3 — About you
  await page.getByLabel(/first name/i).fill('Test')
  await page.getByLabel(/last name/i).fill('User')
  await page.locator('#mobile').fill('0400000000')
  await page.getByLabel(/email/i).fill(email)
  await page.getByLabel(/date of birth/i).fill('1990-01-15')
  await selectToggle(page, 'Single')
  await selectToggle(page, 'Australian Citizen')
  await page.getByRole('button', { name: /next/i }).click()

  // Step 4 — Where you live
  await page.getByLabel(/street address/i).fill('123 Test Street')
  await page.getByLabel(/suburb/i).fill('Sydney')
  await page.getByLabel(/postcode/i).fill('2000')
  await page.getByLabel(/residential status/i).selectOption('Renting')
  await page.getByLabel(/monthly rental payments/i).fill('1800')
  await page.locator('#timeAtAddressYears').fill('3')
  await page.locator('#timeAtAddressMonths').selectOption('0')
  await page.getByRole('button', { name: /next/i }).click()

  // Step 5 — Your job
  await page.getByLabel(/occupation/i).fill('Software Engineer')
  await page.getByLabel(/employer name/i).fill('Acme Pty Ltd')
  await page.getByLabel(/employment type/i).selectOption('Full time')
  await page.locator('#afterTaxIncome').fill('6000')
  await page.locator('#timeInJobYears').fill('3')
  await page.locator('#timeInJobMonths').selectOption('0')
  await page.getByRole('button', { name: /next/i }).click()

  // Step 6 — Expenses & consent
  // Leave expenses at zero (all default to 0), just tick consent and submit
  await page.getByLabel(/i consent/i).check()
  await page.getByRole('button', { name: /send my enquiry/i }).click()

  // Success state
  await expect(page.getByText(/thanks, test/i)).toBeVisible({ timeout: 10000 })
})

// ─── Happy path: Personal loan ───────────────────────────────────────────────

test('happy path — personal loan enquiry submits successfully', async ({ page }) => {
  const email = randomEmail()
  await openModal(page)

  // Step 1 — Loan type
  await selectToggle(page, 'Personal loan')
  await page.getByRole('button', { name: /next/i }).click()

  // Step 2 — The basics
  await page.getByLabel(/loan amount/i).fill('10000')
  await page.getByLabel(/purpose of loan/i).fill('Home renovation')
  await page.getByRole('button', { name: /next/i }).click()

  // Step 3 — About you
  await page.getByLabel(/first name/i).fill('Jane')
  await page.getByLabel(/last name/i).fill('Smith')
  await page.locator('#mobile').fill('0411111111')
  await page.getByLabel(/email/i).fill(email)
  await page.getByLabel(/date of birth/i).fill('1985-06-20')
  await selectToggle(page, 'Single')
  await selectToggle(page, 'Australian Citizen')
  await page.getByRole('button', { name: /next/i }).click()

  // Step 4 — Where you live
  await page.getByLabel(/street address/i).fill('456 Sample Ave')
  await page.getByLabel(/suburb/i).fill('Melbourne')
  await page.getByLabel(/postcode/i).fill('3000')
  await page.getByLabel(/residential status/i).selectOption('Renting')
  await page.getByLabel(/monthly rental payments/i).fill('2000')
  await page.locator('#timeAtAddressYears').fill('2')
  await page.locator('#timeAtAddressMonths').selectOption('6')
  await page.getByRole('button', { name: /next/i }).click()

  // Step 5 — Your job
  await page.getByLabel(/occupation/i).fill('Teacher')
  await page.getByLabel(/employer name/i).fill('Department of Education')
  await page.getByLabel(/employment type/i).selectOption('Full time')
  await page.locator('#afterTaxIncome').fill('5000')
  await page.locator('#timeInJobYears').fill('5')
  await page.locator('#timeInJobMonths').selectOption('0')
  await page.getByRole('button', { name: /next/i }).click()

  // Step 6 — Expenses & consent
  await page.getByLabel(/i consent/i).check()
  await page.getByRole('button', { name: /send my enquiry/i }).click()

  // Success state
  await expect(page.getByText(/thanks, jane/i)).toBeVisible({ timeout: 10000 })
})

// ─── Validation tests ────────────────────────────────────────────────────────

test('validation — step 1 requires loan type selection', async ({ page }) => {
  await openModal(page)
  // Click Next without selecting a loan type
  await page.getByRole('button', { name: /next/i }).click()
  await expect(page.getByText(/please select a loan type/i)).toBeVisible()
})

test('validation — step 2 requires loan amount', async ({ page }) => {
  await openModal(page)
  await selectToggle(page, 'Personal loan')
  await page.getByRole('button', { name: /next/i }).click()
  // Skip loan amount and click Next
  await page.getByRole('button', { name: /next/i }).click()
  await expect(page.getByText(/please enter a loan amount/i)).toBeVisible()
})

test('validation — step 3 requires valid email', async ({ page }) => {
  await openModal(page)
  await selectToggle(page, 'Personal loan')
  await page.getByRole('button', { name: /next/i }).click()
  await page.getByLabel(/loan amount/i).fill('10000')
  await page.getByLabel(/purpose of loan/i).fill('Test')
  await page.getByRole('button', { name: /next/i }).click()
  // Fill in all required fields but use an invalid email
  await page.getByLabel(/first name/i).fill('Test')
  await page.getByLabel(/last name/i).fill('User')
  await page.locator('#mobile').fill('0400000000')
  await page.getByLabel(/email/i).fill('not-an-email')
  await page.getByLabel(/date of birth/i).fill('1990-01-01')
  await selectToggle(page, 'Single')
  await selectToggle(page, 'Australian Citizen')
  await page.getByRole('button', { name: /next/i }).click()
  await expect(page.getByText(/valid email required/i)).toBeVisible()
})

test('validation — step 6 requires consent before submit', async ({ page }) => {
  const email = randomEmail()
  await openModal(page)

  // Fast-track through all steps with minimal valid data
  await selectToggle(page, 'Personal loan')
  await page.getByRole('button', { name: /next/i }).click()
  await page.getByLabel(/loan amount/i).fill('5000')
  await page.getByLabel(/purpose of loan/i).fill('Test')
  await page.getByRole('button', { name: /next/i }).click()
  await page.getByLabel(/first name/i).fill('Test')
  await page.getByLabel(/last name/i).fill('User')
  await page.locator('#mobile').fill('0400000000')
  await page.getByLabel(/email/i).fill(email)
  await page.getByLabel(/date of birth/i).fill('1990-01-01')
  await selectToggle(page, 'Single')
  await selectToggle(page, 'Australian Citizen')
  await page.getByRole('button', { name: /next/i }).click()
  await page.getByLabel(/street address/i).fill('123 Test St')
  await page.getByLabel(/suburb/i).fill('Sydney')
  await page.getByLabel(/postcode/i).fill('2000')
  await page.getByLabel(/residential status/i).selectOption('Renting')
  await page.getByLabel(/monthly rental payments/i).fill('1500')
  await page.locator('#timeAtAddressYears').fill('2')
  await page.locator('#timeAtAddressMonths').selectOption('0')
  await page.getByRole('button', { name: /next/i }).click()
  await page.getByLabel(/occupation/i).fill('Developer')
  await page.getByLabel(/employment type/i).selectOption('Full time')
  await page.locator('#afterTaxIncome').fill('5000')
  await page.locator('#timeInJobYears').fill('2')
  await page.locator('#timeInJobMonths').selectOption('0')
  await page.getByRole('button', { name: /next/i }).click()
  // Try to submit without ticking consent
  await page.getByRole('button', { name: /send my enquiry/i }).click()
  await expect(page.getByText(/you must consent/i)).toBeVisible()
})
