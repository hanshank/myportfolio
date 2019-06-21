const nodemailer = require('nodemailer');
require('dotenv').config();
const bodyParser = require('body-parser');

const transporter = nodemailer.createTransport({
  host: process.env.MAILER_HOST,
  port: process.env.MAILER_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.MAILER_ACCOUNT, // generated ethereal user
    pass: process.env.MAILER_ACCOUNT_PASSWORD, // generated ethereal password
  },
});

function sendToAdmin(clientRequest) {
  // create reusable transporter object using the default SMTP transport

  function sendConfirmationToUser(request) {
    return transporter
      .sendMail({
        from: `"Hans Martin Hanken" ${process.env.MAILER_ACCOUNT}`, // sender address
        to: request.senderEmail, // list of receivers
        replyTo: process.env.MAILER_ACCOUNT,
        subject: 'Thank You For Your Message', // Subject line
        text:
          'Thank you for your message! I will get back to you as soon as possible. Kind regards, Hans Martin Hanken.', // plain text body
        html:
          '<p>Thank you for your message! I will get back to you as soon as possible.<p><p>Kind regards,</p><p>Hans Martin Hanken</p>', // html body
      })
      .catch(err => {
        console.log(err);
        throw Error(
          `Something went wrong and the confirmation email could not be sent to ${process.env.MAILER_CONTACT_RECIPIENT}`
        );
      });
  }

  // send mail with defined transport object
  return transporter
    .sendMail({
      from: `"Portfolio Contact Form" ${process.env.MAILER_ACCOUNT}`, // sender address
      to: process.env.MAILER_CONTACT_RECIPIENT, // list of receivers
      replyTo: clientRequest.senderEmail,
      subject: "New Message From Contact My Portfolio Website's Contact Form", // Subject line
      text: clientRequest.senderMessage, // plain text body
      html: clientRequest.senderMessage, // html body
    })
    .then(() => sendConfirmationToUser(clientRequest))
    .catch(err => {
      console.log(err);
      throw Error(
        `Something went wrong and the contact mail and message could not be sent to ${process.env.MAILER_ACCOUNT}`
      );
    });
}

module.exports = {
  sendToAdmin,
};
