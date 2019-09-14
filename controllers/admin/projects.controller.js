import { create } from '../../models/project.model';

const createOne = (req, res, next) => {
  try {
    create(req.params);
    res.render('admin-index.pug');
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  createOne,
};
