const bcrypt = require('bcryptjs');
const Cookies = require('cookies');
const db = require('../../db');

const loginAdminUser = (req, res, next) => {
  const { username, password } = req.body;
  const authenticated = false;
  const sessionId = 'hellostranger15921#$92aPuPpies';
  db.query('SELECT * FROM users WHERE username = ?', [username], (error, results) => {
    const user = results[0];
    if (user.password === password) {
      db.query('INSERT INTO sessions (id) VALUES (?)', [sessionId], (error, results) => {
        if (error) {
          console.log(error);
          throw Error;
        }
      });
    }
  });
  res.cookie('sessionId', sessionId);
  next();
};

module.exports = {
  loginAdminUser,
};
