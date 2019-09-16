const db = require('../../db');
const { createSlug } = require('../../helpers/misc');

/**
 * Creates and stores a new post in the db
 * @param {Object} req req.body takes a title and content
 * @param {Object} res
 * @param {function} next
 */
function createPost(req, res) {
  const { title, content } = req.body;
  const post = {
    title,
    admin_id: 1,
    slug: createSlug(title),
    content,
  };
  const q = 'INSERT INTO posts SET ?';
  db.query(q, post, (error, results) => {
    if (!error) {
      db.query(
        'INSERT INTO images SET ?',
        { url: `uploads/images/${req.file.filename.split(' ').join('-')}`, post_id: results.insertId },
        (err, result) => {
          if (!err) {
            res.redirect('/admin/posts');
          } else {
            res.status(400).json('Invalid syntax');
          }
        }
      );
    } else {
      res.status(400).json('Invalid syntax');
    }
  });
}

const updatePost = (req, res) => {
  const postImage = req.file;
  const { originalname, buffer, contentType } = postImage;
  const { slug } = req.params;
  const { id, title, content, published } = req.body;

  const postQuery = `UPDATE posts SET ? WHERE slug = ?`;
  const postData = [{ title, content, published }, slug];

  // Update the post
  db.query(postQuery, postData);

  const imageQuery = `UPDATE posts SET ? WHERE post_id = ?`;
  const imageData = [{ url: newImgUrl }, id];
  // Update the assosciated image
  if (postImage) {
    db.query(imageQuery, imageData);
  }
};

module.exports = {
  createPost,
  updatePost,
};
