import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Gmail', // You can use other services like SendGrid, etc.
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendEmail = async (to: string, subject: string, text: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text
  };

  await transporter.sendMail(mailOptions);
};