const router = require('express').Router();
const projectsController = require('../controllers/projectsController');

router.get('/:slug', projectsController.getProject, (req, res) => {
  const { project } = res.locals;
  res.render('project.pug', { project });
});

module.exports = router;
