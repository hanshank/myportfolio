const { Post } = require('../models/index');

const create = async (req, res) => {
  try {
    const post = {
      admin_id: req.body.adminId,
      title: req.body.title,
      content: req.body.content,
    };
    Post.create({ post });
    res.redirect('/admin/posts');
  } catch (error) {
    console.log(error);
  }
};

const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.findAll();
    res.locals.posts = posts;
    next();
  } catch (error) {
    throw error;
  }
};

const getPost = async (req, res, next) => {
  try {
    const { slug } = req.params.slug;
    const post = await Post.findOne({ where: { slug } });
    res.locals.post = post;
    next();
  } catch (error) {
    throw error;
  }
  // const q = `SELECT p.id, p.title, p.slug, p.content, p.created_at, p.updated_at, i.url AS image_url FROM posts AS p INNER JOIN images i on p.id = i.post_id WHERE p.slug IN ('${
  //   req.params.slug
  // }')`;
  // db.query(q, (err, results) => {
  //   if (err) throw err;
  //   res.locals.post = results;
  //   next();
  // });
};

module.exports = {
  getAllPosts,
  getPost,
  create,
};
