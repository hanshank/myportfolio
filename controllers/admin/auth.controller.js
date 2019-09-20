const Cookies = require('cookies');
const bcrypt = require('bcryptjs');
// const db = require('../../db');
const { Admin, Session } = require('../../models/index');

const loginAdminUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({
      raw: true,
      where: {
        username,
      },
    });

    if (bcrypt.compareSync(password, admin.password)) {
      const cookies = new Cookies(req, res);

      console.log('Creating brand new session');
      const newSession = await Session.create({ admin_id: admin.id });
      // Set token
      cookies.set('token', newSession.id);

      return res.redirect('/admin/');
    }
    res.redirect('/login');
  } catch (error) {
    console.log('something is wrong');
    console.log(error);
  }
};

// const createAdminUser = async (req, res, next) => {
//   try {
//     await Admin.create({
//       username: 'hanshank',
//       email: 'hansmhank@gmail.com',
//       password: bcrypt.hashSync('Mischa2017!!', 8),
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

module.exports = {
  loginAdminUser,
};
