const { Project, Image } = require('../models/index');

// const createSlug = name => {
//   let slug = name
//     .toLowerCase()
//     .split(' ')
//     .join('-');

//   slug = slug.replace(/[!?.,]/, '');
//   return slug;
// };

// const create = (req, res) => {
//   const project = {
//     title: req.body.title,
//     content: req.body.content,
//     slug: createSlug(req.body.title),
//   };
//   const q = `INSERT INTO projects SET ?`;
//   db.query(q, project, (err, results) => {
//     if (err) throw err;
//     res.json({ success: 'The post was succesfully created', project: results });
//   });
// };

const getAllProjects = async (req, res, next) => {
  try {
    console.log('inside projects...');
    const projects = await Project.findAll();
    res.locals.projects = projects;
    next();
  } catch (error) {
    console.error(error);
  }
};

const getFourNewestProjects = async (req, res, next) => {
  try {
    const projects = await Project.findAll({ limit: 4, include: [Image] });
    res.locals.projects = projects;
    next();
  } catch (error) {
    throw error;
  }
};

// const getProject = (req, res, next) => {
//   const q = `SELECT name, short_description, slug, description FROM projects WHERE slug IN ('${req.params.slug}')`;
//   db.query(q, (err, results) => {
//     if (err) console.log(err);
//     res.locals.project = results;
//     next();
//   });
// };

module.exports = {
  getAllProjects,
  getFourNewestProjects,
  // getProject,
  // create,
};
