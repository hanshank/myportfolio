const router = require('express').Router();
const postsController = require('../controllers/postsController');

router.get('/', postsController.getAllPosts, (req, res) => {
  const { posts } = req;
  console.log(posts);
  res.render('blog.pug', { posts });
});

module.exports = router;
