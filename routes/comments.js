const router = require('express').Router({ mergeParams: true });
const commentsController = require('../controllers/comments');

router.get('/', commentsController.getAll);
router.post('/', commentsController.create);
router.delete('/:commentId', commentsController.remove);

module.exports = router;
