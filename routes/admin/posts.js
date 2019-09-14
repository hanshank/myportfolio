const router = require('express').Router();
const multer = require('multer');
const { createPost, updatePost } = require('../../controllers/admin/postsController');
const { getAllPosts, getPost } = require('../../controllers/postsController');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './views/uploads/images/');
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

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

module.exports = router;
