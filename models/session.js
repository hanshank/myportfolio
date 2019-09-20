const uuid = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define(
    'Session',
    {
      expires_at: DataTypes.DATE,
      admin_id: DataTypes.INTEGER,
    },
    {
      tableName: 'sessions',
      underscored: true,
      hooks: {
        beforeCreate(session, options) {
          const now = new Date();
          const thirthyDaysFromNow = new Date(now.getTime() + 60 * 60 * 24 * 30 * 1000);
          session.id = uuid();
          session.expires_at = thirthyDaysFromNow;
        },
      },
    }
  );
  Session.associate = function(models) {
    Session.belongsTo(models.Admin);
  };
  return Session;
};
