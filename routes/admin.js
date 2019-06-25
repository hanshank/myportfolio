const admin = require('express').Router();
const isAuthenticated = require('')
;
const root = { root: 'public/html/admin' };

admin.get('/', isAuthenticated, (req, res) => {
  res.sendFile('index.html', root);
});

module.exports = admin;
