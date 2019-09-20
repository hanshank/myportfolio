const Sequelize = require('sequelize');

// Option 2: Passing a connection URI
module.exports = new Sequelize(process.env.DATABASE_URL, null, null, {
  dialect: 'postgres',
});
