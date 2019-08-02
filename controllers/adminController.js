const isAuthenticated = (req, res, next) => {
  if (false) {
    return next();
  }
  res.redirect('/admin/login');
};

module.exports = {
  isAuthenticated,
};
