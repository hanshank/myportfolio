const router = require('express').Router();
const projectsController = require('../controllers/projectsController');

router.use('/blog', require('./blog'));
router.use('/posts', require('./posts'));
router.use('/mailers', require('./mailers'));
router.use('/projects', require('./projects'));

router.get('/', projectsController.getAllProjects, (req, res) => {
  console.log('Hey there.......');
  const { projects } = res.locals;
  res.render('index.pug', { projects });
});

router.post('/contact', (req, res) => {
  console.log('You hit the right spot today!');
  console.log(req.body);
});

router.all('*', (req, res) => {
  res.render('404.pug');
});

module.exports = router;
