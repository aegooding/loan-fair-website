import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEnquiryNotification(enquiry, client) {
  const user = client.user;
  const name = user?.name || 'Unknown';
  const email = user?.email || '—';
  const phone = client.phone || '—';

  const loanDetails = [
    `Loan type: ${enquiry.loanType?.replace(/_/g, ' ')}`,
    `Amount: $${Number(enquiry.loanAmount).toLocaleString('en-AU')}`,
    enquiry.loanTerm ? `Term: ${enquiry.loanTerm / 12} years` : null,
    enquiry.vehicleMake || enquiry.vehicleModel
      ? `Vehicle: ${[enquiry.vehicleYear, enquiry.vehicleMake, enquiry.vehicleModel].filter(Boolean).join(' ')}`
      : null,
    enquiry.loanPurpose ? `Purpose: ${enquiry.loanPurpose}` : null,
  ].filter(Boolean).join('\n');

  const body = `
New enquiry received on Loan Fair.

Reference: ${enquiry.reference}

CLIENT
Name:   ${name}
Email:  ${email}
Phone:  ${phone}

LOAN
${loanDetails}

View in HubSpot or log in to the admin panel to review.
  `.trim();

  await resend.emails.send({
    from: 'Loan Fair <noreply@loanfair.com.au>',
    to: 'hello@loanfair.com.au',
    subject: `New enquiry — ${name} — $${Number(enquiry.loanAmount).toLocaleString('en-AU')}`,
    text: body,
  });
}
