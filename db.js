const mysql = require('mysql');
require('dotenv').config();

console.log({
  socketPath: process.env.DATABASE_SOCKET,
  user: process.env.DATABASE_USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

const connection = mysql.createConnection({
  socketPath: process.env.DATABASE_SOCKET,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

connection.connect(function(err) {
  if (err) throw err;
});

module.exports = connection;
