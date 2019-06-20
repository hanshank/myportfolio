const nodemailer = require('nodemailer');
require('dotenv').config();

// **TODO** ADD ERROR HANDLING

function sendToAdmin(clientRequest) {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: process.env.MAILER_HOST,
    port: process.env.MAILER_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MAILER_ACCOUNT, // generated ethereal user
      pass: process.env.MAILER_ACCOUNT_PASSWORD, // generated ethereal password
    },
  });

  const sendConfirmationToUser = request => {
    try {
      transporter.sendMail({
        from: `"Hans Martin Hanken" ${process.env.MAILER_ACCOUNT}`, // sender address
        replyTo: process.env.MAILER_ACCOUNT,
        to: request.senderEmail, // list of receivers
        subject: 'Thank You For Your Message', // Subject line
        text:
          'Thank you for your message! I will get back to you as soon as possible. Kind regards, Hans Martin Hanken.', // plain text body
        html:
          '<p>Thank you for your message! I will get back to you as soon as possible.<p><p>Kind regards,</p><p>Hans Martin Hanken</p>', // html body
      });
    } catch (err) {
      console.log(err);
    }
  };

  // send mail with defined transport object
  transporter
    .sendMail({
      from: `"Portfolio Contact Form" ${process.env.MAILER_ACCOUNT}`, // sender address
      replyTo: clientRequest.senderEmail,
      to: `${process.env.MAILER_CONTACT_RECIPIENT}`, // list of receivers
      subject: 'New Message', // Subject line
      text: clientRequest.senderMessage, // plain text body
      html: clientRequest.senderMessage, // html body
    })
    .then(sendConfirmationToUser(clientRequest))
    .catch(err => {
      console.log(err);
      return err;
    });
}

module.exports = {
  sendToAdmin,
};
