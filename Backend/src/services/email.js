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
