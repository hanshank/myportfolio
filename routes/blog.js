const router = require('express').Router();
const postsController = require('../controllers/postsController');

router.get('/', postsController.getAllPosts, (req, res) => {
  const { posts } = res.locals;
  res.render('blog.pug', { posts });
});

router.get('/:slug', postsController.getPost, (req, res) => {
  const { post } = res.locals;
  res.render('post.pug', { post });
});

module.exports = router;
