function isAuthenticated(req, res, next) {
  res.redirect('/');
}

module.exports = isAuthenticated;
