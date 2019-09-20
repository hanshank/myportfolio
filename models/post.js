const { createSlug } = require('../utils/helpers/misc');

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      title: DataTypes.STRING,
      slug: DataTypes.STRING,
      description: DataTypes.STRING,
      content: DataTypes.TEXT,
      image_id: DataTypes.INTEGER,
    },
    {
      tableName: 'posts',
      underscored: true,
      hooks: {
        beforeCreate: (post, options) => {
          post.slug = createSlug(post.title);
        },
      },
    }
  );
  Post.associate = function(models) {
    Post.belongsTo(models.Image);
  };
  return Post;
};
