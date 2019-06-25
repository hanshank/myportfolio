const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  debug: true,
  socketPath: process.env.SOCKET_PATH,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

connection.connect(function(err) {
  if (err) throw err;
});

module.exports = connection;
