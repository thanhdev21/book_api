import nodemailer from 'nodemailer';

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  //secure: process.env.EMAIL_SMTP_SECURE, // lack of ssl commented this. You can uncomment it.
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_SMTP_USERNAME,
    pass: process.env.EMAIL_SMTP_PASSWORD,
  },
});
const mailTemplate = (otp) => '<p>Please Confirm your Account.</p><p>OTP: ' + otp + '</p>';

const send = (from: string, to: string, subject: string, html: any) => {
  // send mail with defined transport object
  // visit https://nodemailer.com/ for more options
  return transporter.sendMail({
    from: from, // sender address e.g. no-reply@xyz.com or "Fred Foo 👻" <foo@example.com>
    to: to, // list of receivers e.g. bar@example.com, baz@example.com
    subject: subject, // Subject line e.g. 'Hello ✔'
    //text: text, // plain text body e.g. Hello world?
    html: html, // html body e.g. '<b>Hello world?</b>'
  });
};

export const MAILER_CONFIG_ACCOUNT = {
  admin: {
    name: 'admin',
    email: 'admin@admin.com',
  },
  confirmEmails: {
    from: 'thanhdev.crelife@gmail.com',
  },
};

export default { send, mailTemplate, MAILER_CONFIG_ACCOUNT };
