const router = require('express').Router();
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

router.get('/', (req, res) => {
  res.render('index.pug');
});
router.post('/contact', (req, res) => {
  console.log('You hit the right spot today!');
  console.log(req.body);
});

router.use('/blog', require('./blog'));
router.use('/posts', require('./posts'));
router.use('/mailers', require('./mailers'));

router.all('*', (req, res) => {
  res.render('404.pug');
});

module.exports = router;
