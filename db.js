const mysql = require('mysql');
require('dotenv').config();

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


mysql_config_editor set --login-path=hanshank  --host=localhost \
   --port=3306 --socket=/var/run/mysqld/mysqld.sock --user=hanshank --password=Dexter1945!321!