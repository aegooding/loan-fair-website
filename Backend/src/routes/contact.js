import { Router } from 'express';
import { Resend } from 'resend';

const router = Router();
const resend = new Resend(process.env.RESEND_API_KEY);

router.post('/', async (req, res, next) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    await resend.emails.send({
      from: 'Loan Fair Website <noreply@loanfair.com.au>',
      to: 'andrew@loanfair.com.au',
      replyTo: email,
      subject: `Website enquiry from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        <hr />
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
      `,
    });

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

export default router;
