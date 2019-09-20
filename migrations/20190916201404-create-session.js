module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('sessions', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      expires_at: {
        type: Sequelize.DATE,
      },
      admin_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'admins',
          key: 'id',
        },
        allowNull: false,
        unique: true,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('sessions'),
};
