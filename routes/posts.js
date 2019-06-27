const router = require('express').Router();
const comments = require('./comments');
const postsController = require('../controllers/postsController');

router.get('/', postsController.getAllPosts);
// router.get('/:id', postsController.getOnePost);
router.post('/', postsController.create);

router.use('/:id/comments', comments);

module.exports = router;
