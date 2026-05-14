import { Router } from 'express';
import { Resend } from 'resend';
import { createReferrerContact } from '../services/hubspot.js';

const router = Router();
const resend = new Resend(process.env.RESEND_API_KEY);

router.post('/', async (req, res, next) => {
  try {
    const { firstName, lastName, businessName, aggregator, email, mobile } = req.body;

    if (!firstName || !lastName || !email || !mobile) {
      return res.status(400).json({
        success: false,
        message: 'First name, last name, email and mobile are required',
      });
    }

    // Create HubSpot contact tagged as a referrer (non-blocking on failure)
    try {
      await createReferrerContact({ firstName, lastName, businessName, aggregator, email, mobile });
    } catch (hubspotErr) {
      console.error('HubSpot referrer contact error:', hubspotErr.message);
    }

    // Notify andrew
    await resend.emails.send({
      from: 'Loan Fair Website <noreply@loanfair.com.au>',
      to: 'andrew@loanfair.com.au',
      replyTo: email,
      subject: `New referrer registration — ${firstName} ${lastName}`,
      html: `
        <h2>New Referrer Registration</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mobile:</strong> ${mobile}</p>
        ${businessName ? `<p><strong>Business:</strong> ${businessName}</p>` : ''}
        ${aggregator ? `<p><strong>Aggregator:</strong> ${aggregator}</p>` : ''}
      `,
    });

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

export default router;
