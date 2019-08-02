const router = require('express').Router();
const multer = require('multer');
const { createPost } = require('../../controllers/admin/postsController');
const { getAllPosts } = require('../../controllers/postsController');

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

router.post('/', upload.single('postImage'), createPost);

module.exports = router;
