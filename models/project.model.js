const db = require('../db.js');

const create = params => {
  try {
    db.query('INSERT INTO projects SET ?', params);
  } catch (err) {
    throw err;
  }
};

const getAll = (result, error) => {
  const q = 'SELECT name, short_description, slug, description FROM projects';
  db.query(q, (err, results) => {
    if (err) throw err;
    console.log('hey from get All');
    result(results);
  });
};

module.exports = {
  create,
  getAll,
};
