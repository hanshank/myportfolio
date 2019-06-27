const createSlug = name => {
  let slug = name
    .toLowerCase()
    .split(' ')
    .join('-');

  slug = slug.replace(/[!?.,]/, '');
  return slug;
};

module.exports = {
  createSlug,
};
