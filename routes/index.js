const router = require('express').Router();
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

// router.get("/",function(req,res){
//   connection.query('SELECT * from user LIMIT 2', function(err, rows, fields) {
//   connection.end();
//     if (!err)
//       console.log('The solution is: ', rows);
//     else
//       console.log('Error while performing Query.');
//     });
//   });

router.get('/blog', (req, res) => {
  res.sendFile('blog.html', { root: 'public' });
});

router.post('/contact', (req, res) => {
  console.log('You hit the right spot today!');
  console.log(req.body);
});

router.use('/posts', require('./posts'));
router.use('/mailers', require('./mailers'));

module.exports = router;
