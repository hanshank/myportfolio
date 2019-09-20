const createSlug = name => {
  let slug = name
    .slice()
    .toLowerCase()
    .split(' ')
    .join('-');

  slug = slug.replace(/[!?.,'"`]/, '');
  return slug;
};

module.exports = {
  createSlug,
};
