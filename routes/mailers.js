const router = require('express').Router();
const contact = require('../mailers/contact');

router.post('/contact', (req, res) => {
  try {
    contact.sendToAdmin(req.body);
    res.json({ success: 'Message succesfully sent.' });
  } catch (err) {
    res
      .status(401)
      .json('Something went wrong and the email could not be sent. Please email hansmhank@gmail.com directly.');
  }
});

module.exports = router;
