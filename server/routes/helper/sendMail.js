import nodemailer from 'nodemailer';
import emailTemplate from './emailTemplate.js';

export const verifyEmail = async ({userName, mail_id, otp }) => {
  console.log(mail_id);

  try {
    var transport = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: 'd6aedf26b14869',
        pass: '39f9b82a0b9191',
      },
    });

    const mailOptions = {
      from: 'velavanappaiyan@gmail.com',
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

