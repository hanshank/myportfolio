const db = require('../db');

const isAuthenticated = (req, res, next) => {
  db.query('SELECT id FROM sessions WHERE id = ?', [req.cookies.sessionId || '24124'], (error, results) => {
    if (results[0]) {
      return next();
    }
    res.redirect('/admin/login');
  });
};

const showLogin = (req, res) => {
  res.render('auth.pug');
};

module.exports = {
  isAuthenticated,
  showLogin,
};
