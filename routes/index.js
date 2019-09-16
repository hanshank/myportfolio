const router = require('express').Router();
const projectsController = require('../controllers/projectsController');

// router.use('/admin', require('./admin/index'));
router.use('/blog', require('./blog'));
router.use('/posts', require('./posts'));
router.use('/mailers', require('./mailers'));
router.use('/projects', require('./projects'));

router.get('/', projectsController.getFourNewest, (req, res) => {
  const { projects } = res.locals;
  res.render('index.pug', { projects });
});

router.post('/contact', (req, res) => {});

router.all('*', (req, res) => {
  res.render('404.pug');
});

module.exports = router;
