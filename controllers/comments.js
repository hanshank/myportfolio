const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

const getAll = (req, res) => {
  const q = `SELECT * FROM comments WHERE post_id = ${req.params.id}`;
  db.query(q, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

const create = (req, res) => {
  const comment = {
    post_id: req.params.id,
    user_id: req.body.userId,
    admin_id: req.body.adminId,
    content: req.body.content,
  };
  const q = `INSERT INTO comments SET ?`;
  db.query(q, comment, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

const remove = (req, res) => {
  const q = `DELETE FROM comments WHERE id = ${req.params.commentId}`;
  db.query(q, (err, results) => {
    if (err || results.affectedRows === 0) {
      res.status(404).json({ error: 'Sorry, the comment you are trying to delete could not be found in the databse' });
    }
    res.json(`deleted ${results.affectedRows} rows`);
  });
};

module.exports = {
  getAll,
  create,
  remove,
};
