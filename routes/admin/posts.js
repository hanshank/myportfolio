const router = require('express').Router();
const { createPost, updatePost } = require('../../controllers/admin/postsController');
const { getAllPosts, getPost } = require('../../controllers/postsController');
const { upload, passAlong } = require('../../middleware/image-uploads');

router.get('/', getAllPosts, (req, res, next) => {
  const { posts } = res.locals;
  res.render('admin-posts.pug', { posts });
});

router.get('/new', (req, res) => {
  res.render('admin-new-post');
});

router.get('/:slug/edit', getPost, (req, res) => {
  res.render('admin-edit-post');
});

router.patch('/:slug', updatePost, (req, res) => {
  res.render('admin-posts');
});

router.post('/', upload.single('image'), createPost);

router.post('/:slug', passAlong.single('image'), updatePost);

module.exports = router;
