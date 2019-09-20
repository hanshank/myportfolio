const router = require('express').Router();
const multer = require('multer');

const { createProject, deleteProject } = require('../../controllers/admin/projects.controller');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './views/uploads/images/');
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

router.get('/new', (req, res) => {
  res.render('admin-new-project');
});

router.post('/', upload.single('image'), createProject, (req, res) => {
  res.redirect('/admin/');
});

router.delete('/:slug', deleteProject, (req, res) => {
  res.redirect('/admin');
});

module.exports = router;
