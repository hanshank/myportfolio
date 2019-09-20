const router = require('express').Router();
const { loginAdminUser } = require('../controllers/admin/auth.controller');
const { getFourNewestProjects } = require('../controllers/projects.controller');
const { isAuthenticated, adminIsLoggedIn } = require('../middleware/auth');

// router.use('/admin', require('./admin/index'));
// router.use('/blog', require('./blog'));
// router.use('/posts', require('./posts'));
// router.use('/mailers', require('./mailers'));
// router.use('/projects', require('./projects'));

router.get('/', getFourNewestProjects, (req, res) => {
  const { projects } = res.locals;
  res.render('index.pug', { projects });
});

router.post('/authenticate', loginAdminUser, (req, res, next) => {
  // res.redirect('/admin/posts');
  console.log('........ Inside /authenticate ..........');
  res.send('You are authenticated');
});

router.get('/login', async (req, res, next) => {
  if (await adminIsLoggedIn(req, res)) {
    res.redirect('/admin/');
  } else {
    res.render('auth');
  }
});

router.all('*', (req, res) => {
  res.render('404.pug');
});

module.exports = router;
