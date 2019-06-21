const router = require('express').Router();
require('body-parser');
const contact = require('../mailers/contact');

// TODO - Make sure res.status(500).json(err); displays some error to the client
router.post('/contact', (req, res) => {
  contact
    .sendToAdmin(req.body)
    .then(() => res.json('Message succesfully sent.'))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
