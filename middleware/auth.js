const Cookies = require('cookies');
const { Session } = require('../models/index');

const adminIsLoggedIn = async (req, res) => {
  try {
    const cookies = new Cookies(req, res);
    const cookie = cookies.get('token') || '231';
    let loggedIn = false;
    const session = await Session.findByPk(cookie, { raw: true });
    if (session) {
      if (session.id === cookie) {
        // Authenticate if session is not expired
        if (session.expires_at > Date.now()) {
          loggedIn = true;
        }
      }
    }
    return loggedIn;
  } catch (error) {
    throw Error(error);
  }
};

const isAuthenticated = async (req, res, next) => {
  try {
    const cookies = new Cookies(req, res);
    const token = cookies.get('token') || '231';
    const session = await Session.findByPk(token, { raw: true });
    if (session) {
      if (session.id === token) {
        // Authenticate if session is not expired
        if (session.expires_at > Date.now()) {
          return next();
        }
        // Delete expired sessios
        Session.destroy({ where: { id: session.id } });
      }
    }
    res.redirect('/login');
  } catch (error) {
    throw Error(error);
  }
};

const showLogin = (req, res) => {
  res.render('auth.pug');
};

module.exports = {
  adminIsLoggedIn,
  isAuthenticated,
  showLogin,
};
