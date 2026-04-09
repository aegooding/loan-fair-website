# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: enquiry-form.spec.js >> validation — step 6 requires consent before submit
- Location: tests/enquiry-form.spec.js:176:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText(/you must consent/i)
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText(/you must consent/i)

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
  - dialog "Thanks, Test." [ref=e96]:
    - button "Close" [ref=e97] [cursor=pointer]: ×
    - generic [ref=e98]:
      - generic [ref=e99]: ✓
      - heading "Thanks, Test." [level=2] [ref=e100]
      - paragraph [ref=e101]: We've received your enquiry and will be in touch — usually within 1 business day.
      - generic [ref=e102]:
        - paragraph [ref=e103]: What Happens Next?
        - paragraph [ref=e104]: You will soon receive an email with a link to sign our Privacy Consent form. Signing this form gives us your permission to use the information you supplied us with to work with lenders to get the best rate for you.
      - button "Done" [ref=e105] [cursor=pointer]
```

# Test source

```ts
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
  185 |   await page.getByRole('button', { name: /next/i }).click()
  186 |   await page.getByLabel(/first name/i).fill('Test')
  187 |   await page.getByLabel(/last name/i).fill('User')
  188 |   await page.locator('#mobile').fill('0400000000')
  189 |   await page.getByLabel(/email/i).fill(email)
  190 |   await page.getByLabel(/date of birth/i).fill('1990-01-01')
  191 |   await selectToggle(page, 'Single')
  192 |   await selectToggle(page, 'Australian Citizen')
  193 |   await page.getByRole('button', { name: /next/i }).click()
  194 |   await page.getByLabel(/street address/i).fill('123 Test St')
  195 |   await page.getByLabel(/suburb/i).fill('Sydney')
  196 |   await page.getByLabel(/postcode/i).fill('2000')
  197 |   await page.getByLabel(/residential status/i).selectOption('Renting')
  198 |   await page.getByLabel(/monthly rental payments/i).fill('1500')
  199 |   await page.locator('#timeAtAddressYears').fill('2')
  200 |   await page.locator('#timeAtAddressMonths').selectOption('0')
  201 |   await page.getByRole('button', { name: /next/i }).click()
  202 |   await page.getByLabel(/occupation/i).fill('Developer')
  203 |   await page.getByLabel(/employment type/i).selectOption('Full time')
  204 |   await page.locator('#afterTaxIncome').fill('5000')
  205 |   await page.locator('#timeInJobYears').fill('2')
  206 |   await page.locator('#timeInJobMonths').selectOption('0')
  207 |   await page.getByRole('button', { name: /next/i }).click()
  208 |   // Try to submit without ticking consent
  209 |   await page.getByRole('button', { name: /send my enquiry/i }).click()
> 210 |   await expect(page.getByText(/you must consent/i)).toBeVisible()
      |                                                     ^ Error: expect(locator).toBeVisible() failed
  211 | })
  212 | 
```