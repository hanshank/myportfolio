const router = require('express').Router();
const projectsController = require('../controllers/projectsController');
const { getAllProjects } = require('../controllers/projectsController');

router.get('/', getAllProjects);

router.get('/:slug', projectsController.getProject, (req, res) => {
  const { project } = res.locals;
  res.render('project.pug', { project });
});

module.exports = router;
