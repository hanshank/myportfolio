const router = require('express').Router();
const adminController = require('../../controllers/adminController');
const { loginAdminUser } = require('../../controllers/admin/authController');

router.use('/posts', require('./posts'));
router.use('/projects', require('./projects'));

router.get('/', (req, res) => {
  res.render('admin-index.pug');
});

router.post('/authenticate', loginAdminUser, (req, res, next) => {
  res.redirect('/admin/posts');
});

router.get('/login', (req, res) => {
  res.render('auth.pug');
});

module.exports = router;
