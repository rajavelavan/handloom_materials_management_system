import nodemailer from 'nodemailer';
import emailTemplate from './emailTemplate.js';

export const verifyEmail = async ({userName, mail_id, otp }) => {
  console.log(mail_id);

  try {
    var transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: mail_id,
      subject: 'Greetings From HMMS!',
      html: emailTemplate
      .replace('{{ name }}', userName)
      .replace('{{ userMail }}', mail_id)
      .replace('{{ otp }}', otp)
    };

    const verifyMailresponse = await transport.sendMail(mailOptions);
    return verifyMailresponse;
  } catch (error) {
    throw new Error(error.message);
  }
};

