const { Project, Image } = require('../../models');

const createProject = async (req, res, next) => {
  try {
    const { title, description, content, altText } = req.body;
    await await Project.create(
      {
        title,
        description,
        content,
        Image: {
          url: req.file.path,
          alt_text: altText,
        },
      },
      {
        include: Image,
        individualHooks: true,
      }
    );
    next();
  } catch (error) {
    console.error(error);
  }
};

const deleteProject = async (req, res, next) => {
  try {
    await Project.destroy({ where: { slug: req.params.slug } });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  createProject,
  deleteProject,
};
