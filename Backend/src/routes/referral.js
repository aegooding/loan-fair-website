import { Router } from 'express';
import { Resend } from 'resend';

const router = Router();
const resend = new Resend(process.env.RESEND_API_KEY);

router.post('/', async (req, res, next) => {
  try {
    const { referrerName, referrerEmail, referrerBusiness, referredName, referredEmail, referredPhone, note } = req.body;

    if (!referrerName || !referrerEmail || !referredName || (!referredEmail && !referredPhone)) {
      return res.status(400).json({
        success: false,
        message: 'Referrer name, referrer email, referred person\'s name, and at least one contact detail are required',
      });
    }

    await resend.emails.send({
      from: 'Loan Fair Website <noreply@loanfair.com.au>',
      to: 'andrew@loanfair.com.au',
      replyTo: referrerEmail,
      subject: `New referral from ${referrerName}`,
      html: `
        <h2>New Referral</h2>
        <h3>Referred by</h3>
        <p><strong>Name:</strong> ${referrerName}</p>
        <p><strong>Email:</strong> ${referrerEmail}</p>
        ${referrerBusiness ? `<p><strong>Business:</strong> ${referrerBusiness}</p>` : ''}
        <hr />
        <h3>Referred person</h3>
        <p><strong>Name:</strong> ${referredName}</p>
        ${referredEmail ? `<p><strong>Email:</strong> ${referredEmail}</p>` : ''}
        ${referredPhone ? `<p><strong>Phone:</strong> ${referredPhone}</p>` : ''}
        ${note ? `<hr /><p><strong>Note:</strong></p><p style="white-space: pre-wrap;">${note}</p>` : ''}
      `,
    });

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

export default router;
