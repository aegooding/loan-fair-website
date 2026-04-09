# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: enquiry-form.spec.js >> happy path — car loan enquiry submits successfully
- Location: tests/enquiry-form.spec.js:32:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText(/thanks, test/i)
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByText(/thanks, test/i)

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - banner [ref=e3]:
    - generic [ref=e4]:
      - link "Loan Fair — home" [ref=e5] [cursor=pointer]:
        - /url: /
        - img "Loan Fair" [ref=e6]
      - navigation "Main navigation" [ref=e7]:
        - link "How It Works" [ref=e8] [cursor=pointer]:
          - /url: /how-it-works
        - link "Pricing" [ref=e9] [cursor=pointer]:
          - /url: /pricing
        - link "About" [ref=e10] [cursor=pointer]:
          - /url: /about
        - link "Learn" [ref=e11] [cursor=pointer]:
          - /url: /learn
        - link "FAQ" [ref=e12] [cursor=pointer]:
          - /url: /faq
      - button "Enquire Now →" [ref=e13] [cursor=pointer]
    - dialog "Navigation menu":
      - navigation "Mobile navigation":
        - link "How It Works":
          - /url: /how-it-works
        - link "Pricing":
          - /url: /pricing
        - link "About":
          - /url: /about
        - link "Learn":
          - /url: /learn
        - link "FAQ":
          - /url: /faq
      - button "Enquire Now →"
  - main [ref=e14]:
    - region "Hero" [ref=e15]:
      - generic [ref=e17]:
        - heading "Finance that is fair." [level=1] [ref=e18]:
          - text: Finance
          - text: that is
          - text: fair.
        - paragraph [ref=e19]: Loan Fair is a digital finance platform that accesses multiple lenders to find you the best deal. We only charge a low flat fee. No hidden margin. No surprises.
        - generic [ref=e20]:
          - button "Enquire Now →" [ref=e21] [cursor=pointer]
          - link "See how it works ↓" [ref=e22] [cursor=pointer]:
            - /url: "#how-it-works"
    - generic [ref=e26]:
      - paragraph [ref=e27]: Our model
      - heading "All we charge is a low flat fee." [level=2] [ref=e28]:
        - text: All we charge
        - text: is a low flat fee.
      - paragraph [ref=e29]: That's it. No margin added to your rate. No hidden costs. Just a clearly disclosed fee for arranging your finance.
      - button "Enquire Now →" [ref=e30] [cursor=pointer]
    - generic [ref=e32]:
      - paragraph [ref=e33]: Simple process
      - heading "How Loan Fair Works" [level=2] [ref=e34]
      - generic [ref=e35]:
        - generic [ref=e36]:
          - generic [ref=e37]: "01"
          - heading "Submit once" [level=3] [ref=e38]
          - paragraph [ref=e39]: Tell us about yourself in a single online application. This takes about 5 minutes.
        - generic [ref=e40]:
          - generic [ref=e41]: "02"
          - heading "We find the best deal" [level=3] [ref=e42]
          - paragraph [ref=e43]: We access our panel of lenders, compare their offers, and present you with the most competitive options.
        - generic [ref=e44]:
          - generic [ref=e45]: "03"
          - heading "You choose" [level=3] [ref=e46]
          - paragraph [ref=e47]: Compare side-by-side. Pick the best deal. We handle everything else.
    - generic [ref=e49]:
      - paragraph [ref=e50]: What we stand for
      - heading "Built differently. On purpose." [level=2] [ref=e51]:
        - text: Built differently.
        - text: On purpose.
      - generic [ref=e52]:
        - generic [ref=e53]:
          - heading "Transparency" [level=3] [ref=e54]
          - paragraph [ref=e55]: You know exactly how we're paid. Always.
        - generic [ref=e56]:
          - heading "Honesty" [level=3] [ref=e57]
          - paragraph [ref=e58]: No undisclosed incentives. Ever.
        - generic [ref=e59]:
          - heading "Fairness" [level=3] [ref=e60]
          - paragraph [ref=e61]: We don't charge you more than what our service is worth.
        - generic [ref=e62]:
          - heading "Simplicity" [level=3] [ref=e63]
          - paragraph [ref=e64]: Compare finance without the headache.
    - paragraph [ref=e67]: Most brokers add a little extra to your interest rate to line their own pockets. We don't do that. What you're quoted is what's fair — full stop.
    - generic [ref=e69]:
      - heading "Ready to find a fairer rate?" [level=2] [ref=e70]:
        - text: Ready to find
        - text: a fairer rate?
      - paragraph [ref=e71]: Takes less than 5 minutes. No credit check required to enquire.
      - button "Enquire Now →" [ref=e72] [cursor=pointer]
  - contentinfo [ref=e73]:
    - generic [ref=e74]:
      - generic [ref=e75]:
        - generic [ref=e76]:
          - link "Loan Fair — home" [ref=e77] [cursor=pointer]:
            - /url: /
            - img "Loan Fair" [ref=e78]
          - paragraph [ref=e79]: Finance that is fair.
        - generic [ref=e80]:
          - generic [ref=e81]:
            - paragraph [ref=e82]: Navigate
            - link "How It Works" [ref=e83] [cursor=pointer]:
              - /url: /how-it-works
            - link "About" [ref=e84] [cursor=pointer]:
              - /url: /about
            - link "Learn" [ref=e85] [cursor=pointer]:
              - /url: /learn
            - link "FAQ" [ref=e86] [cursor=pointer]:
              - /url: /faq
          - generic [ref=e87]:
            - paragraph [ref=e88]: Legal
            - link "Privacy Policy" [ref=e89] [cursor=pointer]:
              - /url: /privacy
            - link "Complaints Handling" [ref=e90] [cursor=pointer]:
              - /url: /complaints
            - link "Terms of Use" [ref=e91] [cursor=pointer]:
              - /url: /terms
            - button "Enquire Now" [ref=e92] [cursor=pointer]
      - generic [ref=e93]:
        - paragraph [ref=e94]: "Loan Fair Pty Ltd ABN 82 696 091 924, is an Authorised Credit Representative #577538 of AFAS Group PTY LTD, Australian Credit Licence #414426."
        - paragraph [ref=e95]: © 2026 Loan Fair. All rights reserved.
  - dialog "Your expenses" [ref=e96]:
    - button "Close" [ref=e97] [cursor=pointer]: ×
    - generic [ref=e101]:
      - paragraph [ref=e102]: Step 6 of 6
      - heading "Your expenses" [level=2] [ref=e103]
      - paragraph [ref=e104]: As best you can, give us an understanding of your monthly spending habits.
      - generic [ref=e105]:
        - paragraph [ref=e106]: Fixed & General Expenses
        - generic [ref=e107]:
          - generic [ref=e108]: Council Rates / Body Corporate
          - generic [ref=e109]:
            - generic [ref=e110]:
              - generic: $
              - spinbutton [ref=e111]
            - combobox [ref=e112] [cursor=pointer]:
              - option "Weekly"
              - option "Monthly" [selected]
              - option "Quarterly"
              - option "Annually"
        - generic [ref=e113]:
          - generic [ref=e114]: Home & Contents Insurance
          - generic [ref=e115]:
            - generic [ref=e116]:
              - generic: $
              - spinbutton [ref=e117]
            - combobox [ref=e118] [cursor=pointer]:
              - option "Weekly"
              - option "Monthly" [selected]
              - option "Quarterly"
              - option "Annually"
        - generic [ref=e119]:
          - generic [ref=e120]: Electricity / Gas / Water
          - generic [ref=e121]:
            - generic [ref=e122]:
              - generic: $
              - spinbutton [ref=e123]
            - combobox [ref=e124] [cursor=pointer]:
              - option "Weekly"
              - option "Monthly" [selected]
              - option "Quarterly"
              - option "Annually"
        - generic [ref=e125]:
          - generic [ref=e126]: Internet
          - generic [ref=e127]:
            - generic [ref=e128]:
              - generic: $
              - spinbutton [ref=e129]
            - combobox [ref=e130] [cursor=pointer]:
              - option "Weekly"
              - option "Monthly" [selected]
              - option "Quarterly"
              - option "Annually"
        - generic [ref=e131]:
          - generic [ref=e132]: Mobile Phone
          - generic [ref=e133]:
            - generic [ref=e134]:
              - generic: $
              - spinbutton [ref=e135]
            - combobox [ref=e136] [cursor=pointer]:
              - option "Weekly"
              - option "Monthly" [selected]
              - option "Quarterly"
              - option "Annually"
        - generic [ref=e137]:
          - generic [ref=e138]: Groceries / Household Items
          - generic [ref=e139]:
            - generic [ref=e140]:
              - generic: $
              - spinbutton [ref=e141]
            - combobox [ref=e142] [cursor=pointer]:
              - option "Weekly"
              - option "Monthly" [selected]
              - option "Quarterly"
              - option "Annually"
        - generic [ref=e143]:
          - generic [ref=e144]: Fuel / Public Transport
          - generic [ref=e145]:
            - generic [ref=e146]:
              - generic: $
              - spinbutton [ref=e147]
            - combobox [ref=e148] [cursor=pointer]:
              - option "Weekly"
              - option "Monthly" [selected]
              - option "Quarterly"
              - option "Annually"
        - generic [ref=e149]:
          - generic [ref=e150]: Vehicle Registration
          - generic [ref=e151]:
            - generic [ref=e152]:
              - generic: $
              - spinbutton [ref=e153]
            - combobox [ref=e154] [cursor=pointer]:
              - option "Weekly"
              - option "Monthly" [selected]
              - option "Quarterly"
              - option "Annually"
        - generic [ref=e155]:
          - generic [ref=e156]: Vehicle Insurance
          - generic [ref=e157]:
            - generic [ref=e158]:
              - generic: $
              - spinbutton [ref=e159]
            - combobox [ref=e160] [cursor=pointer]:
              - option "Weekly"
              - option "Monthly" [selected]
              - option "Quarterly"
              - option "Annually"
        - generic [ref=e161]:
          - generic [ref=e162]: Fixed expenses total (monthly)
          - generic [ref=e163]: $0
      - generic [ref=e164]:
        - paragraph [ref=e165]: Discretionary Expenses
        - generic [ref=e166]:
          - generic [ref=e167]: Dining Out / Takeaway
          - generic [ref=e168]:
            - generic [ref=e169]:
              - generic: $
              - spinbutton [ref=e170]
            - combobox [ref=e171] [cursor=pointer]:
              - option "Weekly"
              - option "Monthly" [selected]
              - option "Quarterly"
              - option "Annually"
        - generic [ref=e172]:
          - generic [ref=e173]: Entertainment (Movies, Events etc.)
          - generic [ref=e174]:
            - generic [ref=e175]:
              - generic: $
              - spinbutton [ref=e176]
            - combobox [ref=e177] [cursor=pointer]:
              - option "Weekly"
              - option "Monthly" [selected]
              - option "Quarterly"
              - option "Annually"
        - generic [ref=e178]:
          - generic [ref=e179]: Streaming / Digital Subscriptions
          - generic [ref=e180]:
            - generic [ref=e181]:
              - generic: $
              - spinbutton [ref=e182]
            - combobox [ref=e183] [cursor=pointer]:
              - option "Weekly"
              - option "Monthly" [selected]
              - option "Quarterly"
              - option "Annually"
        - generic [ref=e184]:
          - generic [ref=e185]: Holidays / Travel
          - generic [ref=e186]:
            - generic [ref=e187]:
              - generic: $
              - spinbutton [ref=e188]
            - combobox [ref=e189] [cursor=pointer]:
              - option "Weekly"
              - option "Monthly" [selected]
              - option "Quarterly"
              - option "Annually"
        - generic [ref=e190]:
          - generic [ref=e191]: Clothing / Personal Shopping
          - generic [ref=e192]:
            - generic [ref=e193]:
              - generic: $
              - spinbutton [ref=e194]
            - combobox [ref=e195] [cursor=pointer]:
              - option "Weekly"
              - option "Monthly" [selected]
              - option "Quarterly"
              - option "Annually"
        - generic [ref=e196]:
          - generic [ref=e197]: Hair / Beauty / Grooming
          - generic [ref=e198]:
            - generic [ref=e199]:
              - generic: $
              - spinbutton [ref=e200]
            - combobox [ref=e201] [cursor=pointer]:
              - option "Weekly"
              - option "Monthly" [selected]
              - option "Quarterly"
              - option "Annually"
        - generic [ref=e202]:
          - generic [ref=e203]: Gym / Fitness Memberships
          - generic [ref=e204]:
            - generic [ref=e205]:
              - generic: $
              - spinbutton [ref=e206]
            - combobox [ref=e207] [cursor=pointer]:
              - option "Weekly"
              - option "Monthly" [selected]
              - option "Quarterly"
              - option "Annually"
        - generic [ref=e208]:
          - generic [ref=e209]: Other
          - generic [ref=e210]:
            - generic [ref=e211]:
              - generic: $
              - spinbutton [ref=e212]
            - combobox [ref=e213] [cursor=pointer]:
              - option "Weekly"
              - option "Monthly" [selected]
              - option "Quarterly"
              - option "Annually"
        - generic [ref=e214]:
          - generic [ref=e215]: Discretionary expenses total (monthly)
          - generic [ref=e216]: $0
      - generic [ref=e217]:
        - generic [ref=e218]: Overall monthly expenses
        - generic [ref=e219]: $0
      - generic [ref=e220]:
        - generic [ref=e221]: Any other relevant information
        - textbox "Anything else you'd like us to know about your situation…" [ref=e222]
      - generic [ref=e224] [cursor=pointer]:
        - checkbox "I consent to Loan Fair contacting me about my enquiry and using my information in line with the Privacy Policy." [checked] [ref=e225]
        - generic [ref=e226]:
          - text: I consent to Loan Fair contacting me about my enquiry and using my information in line with the
          - link "Privacy Policy" [ref=e227]:
            - /url: /privacy
          - text: .
      - generic [ref=e228]:
        - button "← Back" [ref=e229] [cursor=pointer]
        - button "Sending…" [disabled] [ref=e230]
```

# Test source

```ts
  1   | // Playwright tests for the Loan Fair enquiry form
  2   | // Run with: npx playwright test
  3   | // By default tests run against the live site (BASE_URL below).
  4   | // To test locally, change BASE_URL to 'http://localhost:5173'
  5   | 
  6   | import { test, expect } from '@playwright/test'
  7   | 
  8   | const BASE_URL = 'https://www.loanfair.com.au'
  9   | 
  10  | // ─── Helpers ────────────────────────────────────────────────────────────────
  11  | 
  12  | // Generate a unique test email for each run so submissions are identifiable
  13  | function randomEmail() {
  14  |   const id = Math.random().toString(36).slice(2, 10)
  15  |   return `test-${id}@loanfair.com.au`
  16  | }
  17  | 
  18  | // Open the enquiry modal by clicking the first "Enquire Now" button
  19  | async function openModal(page) {
  20  |   await page.goto(BASE_URL)
  21  |   await page.getByRole('button', { name: /enquire now/i }).first().click()
  22  |   await expect(page.getByRole('dialog', { name: 'What are you looking for?' })).toBeVisible()
  23  | }
  24  | 
  25  | // Click a toggle-group pill button by its label text
  26  | async function selectToggle(page, label) {
  27  |   await page.getByRole('button', { name: label }).click()
  28  | }
  29  | 
  30  | // ─── Happy path: Car loan ────────────────────────────────────────────────────
  31  | 
  32  | test('happy path — car loan enquiry submits successfully', async ({ page }) => {
  33  |   const email = randomEmail()
  34  |   await openModal(page)
  35  | 
  36  |   // Step 1 — Loan type
  37  |   await selectToggle(page, 'Car loan')
  38  |   await page.getByRole('button', { name: /next/i }).click()
  39  | 
  40  |   // Step 2 — The basics
  41  |   await page.getByLabel(/loan amount/i).fill('25000')
  42  |   await selectToggle(page, 'Refinance')
  43  |   await page.getByLabel(/vehicle year/i).selectOption('2020')
  44  |   await page.getByLabel(/vehicle make/i).fill('Toyota')
  45  |   await page.getByLabel(/vehicle model/i).fill('Camry')
  46  |   await page.getByLabel(/kilometres travelled/i).fill('45000')
  47  |   await page.getByRole('button', { name: /next/i }).click()
  48  | 
  49  |   // Step 3 — About you
  50  |   await page.getByLabel(/first name/i).fill('Test')
  51  |   await page.getByLabel(/last name/i).fill('User')
  52  |   await page.locator('#mobile').fill('0400000000')
  53  |   await page.getByLabel(/email/i).fill(email)
  54  |   await page.getByLabel(/date of birth/i).fill('1990-01-15')
  55  |   await selectToggle(page, 'Single')
  56  |   await selectToggle(page, 'Australian Citizen')
  57  |   await page.getByRole('button', { name: /next/i }).click()
  58  | 
  59  |   // Step 4 — Where you live
  60  |   await page.getByLabel(/street address/i).fill('123 Test Street')
  61  |   await page.getByLabel(/suburb/i).fill('Sydney')
  62  |   await page.getByLabel(/postcode/i).fill('2000')
  63  |   await page.getByLabel(/residential status/i).selectOption('Renting')
  64  |   await page.getByLabel(/monthly rental payments/i).fill('1800')
  65  |   await page.locator('#timeAtAddressYears').fill('3')
  66  |   await page.locator('#timeAtAddressMonths').selectOption('0')
  67  |   await page.getByRole('button', { name: /next/i }).click()
  68  | 
  69  |   // Step 5 — Your job
  70  |   await page.getByLabel(/occupation/i).fill('Software Engineer')
  71  |   await page.getByLabel(/employer name/i).fill('Acme Pty Ltd')
  72  |   await page.getByLabel(/employment type/i).selectOption('Full time')
  73  |   await page.locator('#afterTaxIncome').fill('6000')
  74  |   await page.locator('#timeInJobYears').fill('3')
  75  |   await page.locator('#timeInJobMonths').selectOption('0')
  76  |   await page.getByRole('button', { name: /next/i }).click()
  77  | 
  78  |   // Step 6 — Expenses & consent
  79  |   // Leave expenses at zero (all default to 0), just tick consent and submit
  80  |   await page.getByLabel(/i consent/i).check()
  81  |   await page.getByRole('button', { name: /send my enquiry/i }).click()
  82  | 
  83  |   // Success state
> 84  |   await expect(page.getByText(/thanks, test/i)).toBeVisible({ timeout: 10000 })
      |                                                 ^ Error: expect(locator).toBeVisible() failed
  85  | })
  86  | 
  87  | // ─── Happy path: Personal loan ───────────────────────────────────────────────
  88  | 
  89  | test('happy path — personal loan enquiry submits successfully', async ({ page }) => {
  90  |   const email = randomEmail()
  91  |   await openModal(page)
  92  | 
  93  |   // Step 1 — Loan type
  94  |   await selectToggle(page, 'Personal loan')
  95  |   await page.getByRole('button', { name: /next/i }).click()
  96  | 
  97  |   // Step 2 — The basics
  98  |   await page.getByLabel(/loan amount/i).fill('10000')
  99  |   await page.getByLabel(/purpose of loan/i).fill('Home renovation')
  100 |   await page.getByRole('button', { name: /next/i }).click()
  101 | 
  102 |   // Step 3 — About you
  103 |   await page.getByLabel(/first name/i).fill('Jane')
  104 |   await page.getByLabel(/last name/i).fill('Smith')
  105 |   await page.locator('#mobile').fill('0411111111')
  106 |   await page.getByLabel(/email/i).fill(email)
  107 |   await page.getByLabel(/date of birth/i).fill('1985-06-20')
  108 |   await selectToggle(page, 'Single')
  109 |   await selectToggle(page, 'Australian Citizen')
  110 |   await page.getByRole('button', { name: /next/i }).click()
  111 | 
  112 |   // Step 4 — Where you live
  113 |   await page.getByLabel(/street address/i).fill('456 Sample Ave')
  114 |   await page.getByLabel(/suburb/i).fill('Melbourne')
  115 |   await page.getByLabel(/postcode/i).fill('3000')
  116 |   await page.getByLabel(/residential status/i).selectOption('Renting')
  117 |   await page.getByLabel(/monthly rental payments/i).fill('2000')
  118 |   await page.locator('#timeAtAddressYears').fill('2')
  119 |   await page.locator('#timeAtAddressMonths').selectOption('6')
  120 |   await page.getByRole('button', { name: /next/i }).click()
  121 | 
  122 |   // Step 5 — Your job
  123 |   await page.getByLabel(/occupation/i).fill('Teacher')
  124 |   await page.getByLabel(/employer name/i).fill('Department of Education')
  125 |   await page.getByLabel(/employment type/i).selectOption('Full time')
  126 |   await page.locator('#afterTaxIncome').fill('5000')
  127 |   await page.locator('#timeInJobYears').fill('5')
  128 |   await page.locator('#timeInJobMonths').selectOption('0')
  129 |   await page.getByRole('button', { name: /next/i }).click()
  130 | 
  131 |   // Step 6 — Expenses & consent
  132 |   await page.getByLabel(/i consent/i).check()
  133 |   await page.getByRole('button', { name: /send my enquiry/i }).click()
  134 | 
  135 |   // Success state
  136 |   await expect(page.getByText(/thanks, jane/i)).toBeVisible({ timeout: 10000 })
  137 | })
  138 | 
  139 | // ─── Validation tests ────────────────────────────────────────────────────────
  140 | 
  141 | test('validation — step 1 requires loan type selection', async ({ page }) => {
  142 |   await openModal(page)
  143 |   // Click Next without selecting a loan type
  144 |   await page.getByRole('button', { name: /next/i }).click()
  145 |   await expect(page.getByText(/please select a loan type/i)).toBeVisible()
  146 | })
  147 | 
  148 | test('validation — step 2 requires loan amount', async ({ page }) => {
  149 |   await openModal(page)
  150 |   await selectToggle(page, 'Personal loan')
  151 |   await page.getByRole('button', { name: /next/i }).click()
  152 |   // Skip loan amount and click Next
  153 |   await page.getByRole('button', { name: /next/i }).click()
  154 |   await expect(page.getByText(/please enter a loan amount/i)).toBeVisible()
  155 | })
  156 | 
  157 | test('validation — step 3 requires valid email', async ({ page }) => {
  158 |   await openModal(page)
  159 |   await selectToggle(page, 'Personal loan')
  160 |   await page.getByRole('button', { name: /next/i }).click()
  161 |   await page.getByLabel(/loan amount/i).fill('10000')
  162 |   await page.getByLabel(/purpose of loan/i).fill('Test')
  163 |   await page.getByRole('button', { name: /next/i }).click()
  164 |   // Fill in all required fields but use an invalid email
  165 |   await page.getByLabel(/first name/i).fill('Test')
  166 |   await page.getByLabel(/last name/i).fill('User')
  167 |   await page.locator('#mobile').fill('0400000000')
  168 |   await page.getByLabel(/email/i).fill('not-an-email')
  169 |   await page.getByLabel(/date of birth/i).fill('1990-01-01')
  170 |   await selectToggle(page, 'Single')
  171 |   await selectToggle(page, 'Australian Citizen')
  172 |   await page.getByRole('button', { name: /next/i }).click()
  173 |   await expect(page.getByText(/valid email required/i)).toBeVisible()
  174 | })
  175 | 
  176 | test('validation — step 6 requires consent before submit', async ({ page }) => {
  177 |   const email = randomEmail()
  178 |   await openModal(page)
  179 | 
  180 |   // Fast-track through all steps with minimal valid data
  181 |   await selectToggle(page, 'Personal loan')
  182 |   await page.getByRole('button', { name: /next/i }).click()
  183 |   await page.getByLabel(/loan amount/i).fill('5000')
  184 |   await page.getByLabel(/purpose of loan/i).fill('Test')
```