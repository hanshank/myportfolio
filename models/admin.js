module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define(
    'Admin',
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      tableName: 'admins',
      underscored: true,
    }
  );
  Admin.associate = function(models) {
    Admin.hasOne(models.Session);
  };
  return Admin;
};
