module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    'Image',
    {
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      alt_text: DataTypes.STRING,
    },
    {
      tableName: 'images',
      underscored: true,
    }
  );
  Image.associate = function(models) {
    Image.hasOne(models.Project);
    Image.hasOne(models.Post);
  };
  return Image;
};
