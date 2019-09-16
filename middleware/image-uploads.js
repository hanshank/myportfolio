const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './views/uploads/images/');
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
const passAlong = multer({ storage: multer.memoryStorage() });

module.exports = {
  upload,
  passAlong,
};
