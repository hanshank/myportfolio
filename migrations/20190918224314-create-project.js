module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('projects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      slug: {
        type: Sequelize.STRING,
      },
      content: {
        type: Sequelize.TEXT,
      },
      image_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'images',
          key: 'id',
        },
        allowNull: false,
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('projects'),
};
