const router = require('express').Router();
const adminController = require('../../controllers/adminController');

router.use('/posts', require('./posts'));

router.get('/', adminController.isAuthenticated, (req, res) => {
  res.render('admin-index.pug');
});

router.get('/login', (req, res) => {
  res.render('auth.pug');
});

router.post('/login', (req, res) => {
  res.redirect('/');
});

module.exports = router;
