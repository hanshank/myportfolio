const bcrypt = require('bcryptjs');
require('dotenv').config();

module.exports = {
  up: (queryInterface, Sequelize) => {
    const salt = bcrypt.genSaltSync(10);
    return queryInterface.bulkInsert(
      'admins',
      [
        {
          username: 'hanshank',
          email: 'hansmhank@gmail.com',
          password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, salt),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  },
};
