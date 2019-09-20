const router = require('express').Router();
const { getAllProjects } = require('../../controllers/projects.controller');
const { getAllPosts } = require('../../controllers/posts.controller');

router.use('/posts', require('./posts'));
router.use('/projects', require('./projects'));

router.get('/', getAllPosts, getAllProjects, (req, res) => {
  console.log('inside...');
  const { posts, projects } = res.locals;
  res.render('admin-index.pug', { posts, projects });
});

module.exports = router;
