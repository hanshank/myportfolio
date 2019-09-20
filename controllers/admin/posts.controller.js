const { createSlug } = require('../../utils/helpers/misc');
const { Post, Image } = require('../../models/index');

/**
 * Creates and stores a new post in the db
 * @param {Object} req req.body takes a title and content
 * @param {Object} res
 * @param {function} next
 */
const createPost = async (req, res, next) => {
  try {
    const { title, content, description, altText } = req.body;
    await Post.create(
      {
        Image: {
          url: req.file.path,
          alt_text: altText,
        },
        adminId: 1,
        title,
        content,
        description,
      },
      { individualHooks: true, include: Image }
    );
    next();
  } catch (error) {
    res.status(400).json('Invalid syntax');
    throw error;
  }
};

// const updatePost = (req, res) => {
//   const postImage = req.file;
//   const { originalname, buffer, contentType } = postImage;
//   const { slug } = req.params;
//   const { id, title, content, published } = req.body;

//   const postQuery = `UPDATE posts SET ? WHERE slug = ?`;
//   const postData = [{ title, content, published }, slug];

//   // Update the post
//   db.query(postQuery, postData);

//   const imageQuery = `UPDATE posts SET ? WHERE post_id = ?`;
//   const imageData = [{ url: newImgUrl }, id];
//   // Update the assosciated image
//   if (postImage) {
//     db.query(imageQuery, imageData);
//   }
// };

module.exports = {
  createPost,
};
