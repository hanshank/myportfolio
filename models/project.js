const { createSlug } = require('../utils/helpers/misc');

module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define(
    'Project',
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      content: DataTypes.TEXT,
      image_id: DataTypes.INTEGER,
      slug: DataTypes.STRING,
    },
    {
      underscored: true,
      hooks: {
        beforeCreate: (project, options) => {
          project.slug = createSlug(project.title);
        },
      },
    }
  );
  Project.associate = function(models) {
    Project.belongsTo(models.Image);
  };
  return Project;
};
