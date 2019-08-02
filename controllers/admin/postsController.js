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
  console.log(req.file);
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
            res.status(201).json('Succesfully created');
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

module.exports = {
  createPost,
};
