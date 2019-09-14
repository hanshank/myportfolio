const db = require('../db');

const create = (req, res) => {
  const post = {
    admin_id: req.body.adminId,
    title: req.body.title,
    content: req.body.content,
  };
  const q = `INSERT INTO posts SET ?`;
  db.query(q, post, (err, results) => {
    if (err) throw err;
  });
  res.redirect('/admin/posts');
};

const getAllPosts = (req, res, next) => {
  const q =
    'SELECT p.title, p.slug, p.content, p.created_at, p.updated_at, i.url AS image_url FROM posts p INNER JOIN images i on p.id = i.post_id ORDER BY p.created_at DESC';
  db.query(q, (err, results) => {
    res.locals.posts = results;
    next();
  });
};

const getPost = (req, res, next) => {
  console.log(req.params);
  const q = `SELECT p.title, p.slug, p.content, p.created_at, p.updated_at, i.url AS image_url FROM posts AS p INNER JOIN images i on p.id = i.post_id WHERE p.slug IN ('${
    req.params.slug
  }')`;
  db.query(q, (err, results) => {
    if (err) throw err;
    res.locals.post = results;
    next();
  });
};

module.exports = {
  getAllPosts,
  getPost,
  create,
};
