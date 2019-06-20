const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

const create = (req, res) => {
  const post = {
    admin_id: req.body.adminId,
    title: req.body.title,
    content: req.body.content,
  };
  const q = `INSERT INTO posts SET ?`;
  db.query(q, post, (err, results) => {
    if (err) throw err;
    res.json({ success: 'The post was succesfully created', post: results });
  });
};

const getAllPosts = (req, res) => {
  const q =
    'SELECT p.title, p.content, p.created_at, p.updated_at, i.url AS image_url FROM posts p INNER JOIN images i on p.id = i.post_id';
  db.query(q, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

const getOnePost = (req, res) => {
  console.log('I was hit');
  const q = `SELECT p.title, p.content, p.created_at, p.updated_at, i.url AS image_url FROM posts p INNER JOIN images i on p.id = i.post_id WHERE p.id = ${
    req.params.id
  }`;
  db.query(q, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

module.exports = {
  getAllPosts,
  getOnePost,
  create,
};
