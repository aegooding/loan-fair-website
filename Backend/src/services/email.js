import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const aud = (n) =>
  n != null && n !== ''
    ? Number(n).toLocaleString('en-AU', { style: 'currency', currency: 'AUD', minimumFractionDigits: 0, maximumFractionDigits: 0 })
    : '—';

const val = (v) => (v != null && v !== '' ? String(v) : '—');

const row = (label, value) =>
  `<tr>
    <td style="padding:4px 16px 4px 0;color:#666;white-space:nowrap;vertical-align:top;font-size:13px">${label}</td>
    <td style="padding:4px 0;color:#111;vertical-align:top;font-size:13px">${value}</td>
  </tr>`;

const section = (title, rows) => `
  <h3 style="margin:28px 0 8px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#356852;border-bottom:2px solid #356852;padding-bottom:5px">${title}</h3>
  <table style="border-collapse:collapse;width:100%">${rows.join('')}</table>`;

export async function sendEnquiryNotification(enquiry, client) {
  const user = client.user;

  // ── Loan ──────────────────────────────────────────────────────────────
  const loanRows = [
    row('Reference', val(enquiry.reference)),
    row('Loan type', val(enquiry.loanType?.replace(/_/g, ' '))),
    row('Amount', aud(enquiry.loanAmount)),
    row('Term', enquiry.loanTerm ? `${enquiry.loanTerm / 12} years` : '—'),
  ];
  if (enquiry.loanPurpose) loanRows.push(row('Purpose', val(enquiry.loanPurpose)));
  if (enquiry.vehicleMake || enquiry.vehicleModel || enquiry.vehicleYear) {
    loanRows.push(row('Vehicle', [enquiry.vehicleYear, enquiry.vehicleMake, enquiry.vehicleModel].filter(Boolean).join(' ')));
  }
  if (enquiry.vehicleCondition) loanRows.push(row('Vehicle condition', val(enquiry.vehicleCondition)));
  if (enquiry.vehicleKms) loanRows.push(row('Kilometres', `${Number(enquiry.vehicleKms).toLocaleString()} km`));

  // ── Personal ──────────────────────────────────────────────────────────
  const dob = client.dateOfBirth ? new Date(client.dateOfBirth).toLocaleDateString('en-AU') : '—';
  const deps = client.numDependants > 0
    ? `${client.numDependants}${client.dependantAges?.length ? ` (ages: ${client.dependantAges.join(', ')})` : ''}`
    : '0';

  const personalRows = [
    row('Name', val(user?.name)),
    row('Email', val(user?.email)),
    row('Phone', val(user?.phone)),
    row('Date of birth', dob),
    row('Marital status', val(client.maritalStatus)),
    row('Citizenship', val(client.citizenshipStatus)),
    row('Dependants', deps),
  ];

  // ── Licence ───────────────────────────────────────────────────────────
  const licenceRows = [
    row('Licence number', val(client.licenceNumber)),
    row('Expiry', val(client.licenceExpiry)),
    row('Card number', val(client.licenceCardNumber)),
    row('State', val(client.licenceState)),
  ];

  // ── Address ───────────────────────────────────────────────────────────
  const addressRows = [
    row('Street', val(client.streetAddress)),
    row('Suburb', val(client.city)),
    row('State / Postcode', [client.state, client.postcode].filter(Boolean).join(' ') || '—'),
    row('Residential status', val(client.residencyStatus)),
    row('Time at address', client.timeAtAddressYears != null
      ? `${client.timeAtAddressYears}y ${client.timeAtAddressMonths || 0}m` : '—'),
  ];
  if (client.mortgageBalance) addressRows.push(row('Mortgage balance', aud(client.mortgageBalance)));
  if (client.mortgageRepayments) addressRows.push(row('Mortgage repayments', `${aud(client.mortgageRepayments)}/mo`));
  if (client.rentalPayments) addressRows.push(row('Rental payments', `${aud(client.rentalPayments)}/mo`));
  if (client.prevAddress) {
    addressRows.push(row('Previous address', val(client.prevAddress)));
    addressRows.push(row('Prev. residential status', val(client.prevResidentialStatus)));
    if (client.prevMortgageBalance) addressRows.push(row('Prev. mortgage balance', aud(client.prevMortgageBalance)));
    if (client.prevMortgageRepayments) addressRows.push(row('Prev. mortgage repayments', `${aud(client.prevMortgageRepayments)}/mo`));
    if (client.prevRentalPayments) addressRows.push(row('Prev. rental payments', `${aud(client.prevRentalPayments)}/mo`));
  }
  if (client.otherPropertyMortgage === 'Yes') {
    addressRows.push(row('Other property mortgage balance', aud(client.otherPropertyBalance)));
    addressRows.push(row('Other property repayments', `${aud(client.otherPropertyRepayments)}/mo`));
  }

  // ── Employment ────────────────────────────────────────────────────────
  const employmentRows = [
    row('Occupation', val(client.occupation)),
    row('Employer', val(client.employerName)),
    row('Employment type', val(client.employmentStatus?.replace(/_/g, ' '))),
    row('Time in role', client.timeInJobYears != null
      ? `${client.timeInJobYears}y ${client.timeInJobMonths || 0}m` : '—'),
  ];
  if (client.prevOccupation || client.prevEmployerName) {
    employmentRows.push(row('Previous occupation', val(client.prevOccupation)));
    employmentRows.push(row('Previous employer', val(client.prevEmployerName)));
    employmentRows.push(row('Previous employment type', val(client.prevEmploymentType?.replace(/_/g, ' '))));
  }

  // ── Income ────────────────────────────────────────────────────────────
  const incomeRows = [
    row('After-tax income', client.afterTaxIncome
      ? `${aud(client.afterTaxIncome)} ${val(client.incomeFrequency)}` : '—'),
    row('Annual income (calc.)', aud(client.annualIncome)),
    row('Other income sources', client.otherIncomeSources?.length
      ? client.otherIncomeSources.join(', ') : '—'),
  ];
  if (client.otherIncome) {
    incomeRows.push(row('Partner annual income', aud(client.otherIncome)));
    incomeRows.push(row('Partner income', client.partnerIncome
      ? `${aud(client.partnerIncome)} ${val(client.partnerIncomeFrequency)}` : '—'));
  }

  // ── Assets & Liabilities ─────────────────────────────────────────────
  const assetsRows = [
    row('Savings', client.savingsAmount ? `${aud(client.savingsAmount)}${client.savingsInstitution ? ` (${client.savingsInstitution})` : ''}` : '—'),
    row('Shares / investments', aud(client.sharesValue)),
    row('Other assets', val(client.otherAssets)),
    row('Credit card limit(s)', aud(client.creditCardLimit)),
    row('Credit card balance', aud(client.creditCardBalance)),
    row('Personal loan balance', aud(client.personalLoanBalance)),
    row('Personal loan repayments', client.personalLoanRepayments ? `${aud(client.personalLoanRepayments)}/mo` : '—'),
    row('Other liabilities', val(client.otherLiabilities)),
  ];

  // ── Expenses ──────────────────────────────────────────────────────────
  const expenseRows = [];
  if (client.fixedExpenses && typeof client.fixedExpenses === 'object') {
    Object.entries(client.fixedExpenses).forEach(([k, v]) => {
      if (v && Number(v) > 0) expenseRows.push(row(k, `${aud(v)}/mo`));
    });
  }
  if (client.discretionaryExpenses && typeof client.discretionaryExpenses === 'object') {
    Object.entries(client.discretionaryExpenses).forEach(([k, v]) => {
      if (v && Number(v) > 0) expenseRows.push(row(k, `${aud(v)}/mo`));
    });
  }
  expenseRows.push(row('<strong>Fixed expenses total</strong>', `<strong>${aud(client.monthlyFixedExpenses)}/mo</strong>`));
  expenseRows.push(row('<strong>Discretionary total</strong>', `<strong>${aud(client.monthlyDiscretionaryExpenses)}/mo</strong>`));
  expenseRows.push(row('<strong>Overall monthly total</strong>', `<strong>${aud(client.monthlyExpenses)}/mo</strong>`));

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:680px;margin:0 auto;color:#111;padding:24px">
      <div style="background:#356852;padding:20px 28px;border-radius:0 12px 0 12px;margin-bottom:8px">
        <h1 style="margin:0;color:#ecdbba;font-size:20px">New Loan Fair Enquiry</h1>
        <p style="margin:6px 0 0;color:#d8b384;font-size:14px">
          ${val(user?.name)} &mdash; ${aud(enquiry.loanAmount)} ${val(enquiry.loanType?.replace(/_/g, ' '))}
        </p>
      </div>

      ${section('Loan Details', loanRows)}
      ${section('Personal Details', personalRows)}
      ${section("Driver's Licence", licenceRows)}
      ${section('Address', addressRows)}
      ${section('Employment', employmentRows)}
      ${section('Income', incomeRows)}
      ${section('Assets & Liabilities', assetsRows)}
      ${expenseRows.length > 3 ? section('Expenses', expenseRows) : ''}
      ${client.additionalInfo ? section('Additional Information', [row('Notes', val(client.additionalInfo))]) : ''}

      <p style="margin-top:40px;font-size:11px;color:#aaa;border-top:1px solid #eee;padding-top:12px">
        Submitted via loanfair.com.au &mdash; ${new Date().toLocaleString('en-AU', { timeZone: 'Australia/Sydney' })} AEST
      </p>
    </div>`;

  await resend.emails.send({
    from: 'Loan Fair <noreply@loanfair.com.au>',
    to: 'hello@loanfair.com.au',
    subject: `New enquiry — ${val(user?.name)} — ${aud(enquiry.loanAmount)}`,
    html,
  });
}

export async function sendEnquiryConfirmation(enquiry, client) {
  const user = client.user;
  const firstName = user?.name?.split(' ')[0] || 'there';
  const loanType = enquiry.loanType?.replace(/_/g, ' ').toLowerCase() || 'loan';

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
    <body style="margin:0;padding:0;background:#f4f0e8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
      <div style="max-width:600px;margin:40px auto;background:#356852;border-radius:0 24px 0 24px;overflow:hidden">

        <!-- Header -->
        <div style="padding:40px 48px 32px">
          <p style="margin:0 0 32px;font-size:22px;font-weight:800;color:#ecdbba;letter-spacing:-0.02em">Loan Fair</p>
          <h1 style="margin:0 0 12px;font-size:32px;font-weight:800;color:#ecdbba;letter-spacing:-0.03em;line-height:1.2">
            Thanks, ${firstName}.
          </h1>
          <p style="margin:0;font-size:17px;color:#d8b384;line-height:1.6">
            We've received your ${loanType} enquiry and we're on it.
          </p>
        </div>

        <!-- Divider -->
        <div style="height:1px;background:rgba(236,219,186,0.15);margin:0 48px"></div>

        <!-- Body -->
        <div style="padding:32px 48px">
          <p style="margin:0 0 20px;font-size:15px;color:#ecdbba;line-height:1.7">
            Your enquiry reference is:
          </p>
          <div style="background:rgba(236,219,186,0.1);border:1px solid rgba(236,219,186,0.25);border-radius:0 10px 0 10px;padding:14px 20px;margin-bottom:28px;display:inline-block">
            <span style="font-size:18px;font-weight:700;color:#d8b384;letter-spacing:0.04em">${enquiry.reference}</span>
          </div>

          <p style="margin:0 0 24px;font-size:15px;color:#ecdbba;line-height:1.7">
            Here's what happens next:
          </p>

          <!-- Steps -->
          <div style="margin-bottom:12px">

            <div style="display:flex;margin-bottom:16px">
              <div style="min-width:32px;height:32px;background:#d8b384;border-radius:0 8px 0 8px;display:flex;align-items:center;justify-content:center;margin-right:16px;margin-top:2px">
                <span style="font-size:14px;font-weight:800;color:#356852">1</span>
              </div>
              <div>
                <p style="margin:0 0 4px;font-size:15px;font-weight:700;color:#ecdbba">Document request — within 24 hours</p>
                <p style="margin:0;font-size:14px;color:rgba(236,219,186,0.75);line-height:1.6">
                  You'll receive an email asking you to securely upload a few documents. We'll need things like your driver's licence, recent payslips, and bank statements — we'll spell out exactly what's required.
                </p>
              </div>
            </div>

            <div style="display:flex;margin-bottom:16px">
              <div style="min-width:32px;height:32px;background:#d8b384;border-radius:0 8px 0 8px;display:flex;align-items:center;justify-content:center;margin-right:16px;margin-top:2px">
                <span style="font-size:14px;font-weight:800;color:#356852">2</span>
              </div>
              <div>
                <p style="margin:0 0 4px;font-size:15px;font-weight:700;color:#ecdbba">Lender recommendation</p>
                <p style="margin:0;font-size:14px;color:rgba(236,219,186,0.75);line-height:1.6">
                  Once we have your documents, we'll assess your situation and recommend the lender best suited to your needs — with a clear explanation of why.
                </p>
              </div>
            </div>

            <div style="display:flex">
              <div style="min-width:32px;height:32px;background:#d8b384;border-radius:0 8px 0 8px;display:flex;align-items:center;justify-content:center;margin-right:16px;margin-top:2px">
                <span style="font-size:14px;font-weight:800;color:#356852">3</span>
              </div>
              <div>
                <p style="margin:0 0 4px;font-size:15px;font-weight:700;color:#ecdbba">Submitting your application</p>
                <p style="margin:0;font-size:14px;color:rgba(236,219,186,0.75);line-height:1.6">
                  Once you're happy with our recommendation, we handle the application from end to end — submitting to the lender and keeping you updated every step of the way.
                </p>
              </div>
            </div>

          </div>
        </div>

        <!-- Divider -->
        <div style="height:1px;background:rgba(236,219,186,0.15);margin:0 48px"></div>

        <!-- Questions callout -->
        <div style="padding:28px 48px 40px">
          <p style="margin:0 0 8px;font-size:15px;color:#ecdbba;line-height:1.7">
            Got questions in the meantime? Just reply to this email or reach us at
            <a href="mailto:hello@loanfair.com.au" style="color:#d8b384;text-decoration:none">hello@loanfair.com.au</a>.
            We're a real team — you'll hear back from a real person.
          </p>
        </div>

        <!-- Footer -->
        <div style="background:#2d5a45;padding:24px 48px">
          <p style="margin:0 0 4px;font-size:13px;color:rgba(236,219,186,0.5);line-height:1.6">
            Loan Fair &mdash; Finance that's actually on your side.
          </p>
          <p style="margin:0;font-size:11px;color:rgba(236,219,186,0.3);line-height:1.6">
            This email was sent because you submitted an enquiry at loanfair.com.au. General advice only — not financial advice. Please read our
            <a href="https://loanfair.com.au/privacy" style="color:rgba(236,219,186,0.4);text-decoration:none">Privacy Policy</a>.
          </p>
        </div>

      </div>
    </body>
    </html>`;

  await resend.emails.send({
    from: 'Loan Fair <hello@loanfair.com.au>',
    to: user.email,
    subject: `We've received your enquiry, ${firstName}.`,
    html,
  });
}
