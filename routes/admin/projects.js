const router = require('express').Router();
const bodyParser = require('body-parser');
const multer = require('multer');
const { createOne } = require('../../models/project.model');

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

router.post('/', upload.single('image'), (req, res) => createOne);

module.exports = router;
