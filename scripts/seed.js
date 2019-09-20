const axios = require('axios');
const faker = require('faker');
const bcrypt = require('bcryptjs');
const db = require('../db');
require('dotenv').config();
const helpers = require('../utils/helpers/misc');

const numOfPostsAndImages = process.env.SEED_AMOUNT;
const numberOfUserComments = numOfPostsAndImages * 5;
const numberOfAdminComments = numOfPostsAndImages * 2;

const numberOfAdmins = 1;
const numberOfUsers = numOfPostsAndImages * 2;

const imgApi = `${process.env.IMG_API}/?client_id=${process.env.IMG_API_KEY}`;

const seedData = callback => {
  const randomInt = max => Math.floor(Math.random() * Math.floor(max) + 1);

  const createAdmins = amount => {
    for (let i = 0; i < amount; i++) {
      db.query(
        'INSERT INTO admins SET ?',
        {
          username: faker.internet.userName(),
          email: faker.internet.email(),
          password: bcrypt.hashSync(faker.internet.password(), 10),
        },
        function(err, rows) {
          if (!err) console.log('The solution is: ', rows);
          else console.log(err);
        }
      );
    }
  };

  const createUsers = amount => {
    for (let i = 0; i < amount; i++) {
      db.query(
        'INSERT INTO users SET ?',
        {
          username: faker.internet.userName(),
          email: faker.internet.email(),
          password: bcrypt.hashSync(faker.internet.password(), 10),
        },
        function(err, rows) {
          if (!err) console.log('The solution is: ', rows);
          else console.log(err);
        }
      );
    }
  };

  const createPostsAndImages = amount => {
    for (let i = 0; i < amount; i++) {
      // Post query
      const postTitle = faker.lorem.words();

      db.query(
        'INSERT INTO posts SET ?',
        {
          title: postTitle,
          slug: helpers.createSlug(postTitle),
          content: `<p>${faker.lorem.text()}</p><p>${faker.lorem.text()}</p><p>${faker.lorem.text()}</p><p>${faker.lorem.text()}</p><p>${faker.lorem.text()}</p>`,
          admin_id: 1,
          created_at: faker.date.past(),
        },
        function(err, rows) {
          if (!err) console.log('The solution is: ', rows);
          else console.log(err);
        }
      );

      // Image query
      axios
        .get(imgApi)
        .then(res => {
          console.log(res.data.urls);
          db.query(
            'INSERT INTO images SET ?',
            {
              url: res.data.urls.regular,
              post_id: i + 1,
              created_at: faker.date.past(),
            },
            function(err, rows) {
              if (!err) console.log('The solution is: ', rows);
              else console.log(err);
            }
          );
        })
        .catch(error => console.log(error));
    }
  };

  const createUserComments = amount => {
    for (let i = 0; i < amount; i++) {
      db.query(
        'INSERT INTO comments SET ?',
        {
          post_id: randomInt(numOfPostsAndImages),
          user_id: randomInt(numberOfUsers),
          content: faker.lorem.paragraph(),
        },
        function(err, rows) {
          if (!err) console.log('The solution is: ', rows);
          else console.log(err);
        }
      );
    }
  };

  const createAdminComments = amount => {
    for (let i = 0; i < amount; i++) {
      db.query(
        'INSERT INTO comments SET ?',
        {
          post_id: randomInt(numOfPostsAndImages),
          admin_id: 1,
          content: faker.lorem.paragraph(),
        },
        function(err, rows) {
          if (!err) console.log('The solution is: ', rows);
          else console.log(err);
        }
      );
    }
  };

  // Open up a new mysql db connection

  const projectsQuery = 'INSERT INTO projects (name, slug, short_description, description) VALUES ?';
  const projects = [
    ['Yamovie', helpers.createSlug('Yamovie'), 'FULL STACK NODE/REACT + DESIGN', faker.lorem.paragraphs()],
    ['&SÜPA', helpers.createSlug('SÜPA'), 'FULL STACK NODE/GATSBY + DESIGN', faker.lorem.paragraphs()],
    ['Muli Clothing', helpers.createSlug('Muli Clothing'), 'DESIGN + CUSTOMIZATION', faker.lorem.paragraphs()],
    ['Rails Stack', helpers.createSlug('Rails Stack'), 'FULL STACK RAILS/REACT + DESIGN', faker.lorem.paragraphs()],
  ];

  function createProjects() {
    db.query(projectsQuery, [projects], (err, rows) => {
      if (!err) console.log('The solution is: ', rows);
      else console.log(err);
    });
  }

  const tagsQuery = 'INSERT INTO tags (name) VALUES ?';
  const tags = [['Design'], ['Full Stack'], ['Website'], ['Front End']];

  function createTags() {
    db.query(tagsQuery, [tags], (err, rows) => {
      if (!err) console.log('The solution is: ', rows);
      else console.log(err);
    });
  }

  const toolsQuery = 'INSERT INTO tools (name) VALUES ?';
  const tools = [
    ['Wordpress'],
    ['Gatsby'],
    ['Node'],
    ['React'],
    ['Express'],
    ['GraphQL'],
    ['HTML'],
    ['CSS'],
    ['SASS'],
    ['JavaScript'],
    ['Ruby'],
    ['Ruby On Rails'],
  ];

  function createTools() {
    db.query(toolsQuery, [tools], (err, rows) => {
      if (!err) console.log('The solution is: ', rows);
      else console.log(err);
    });
  }

  const projectTagsQuery = 'INSERT INTO project_tags (tag_id, project_id) VALUES ?';
  const projectTags = [
    [1, 1],
    [2, 1],
    [3, 1],
    [4, 1],
    [1, 2],
    [2, 2],
    [3, 2],
    [4, 2],
    [1, 3],
    [3, 3],
    [4, 3],
    [1, 4],
    [2, 4],
    [3, 4],
    [4, 4],
  ];

  function createProjectTags() {
    db.query(projectTagsQuery, [projectTags], (err, rows) => {
      if (!err) console.log('The solution is: ', rows);
      else console.log(err);
    });
  }

  const projectToolsQuery = 'INSERT INTO project_tools (tool_id, project_id) VALUES ?';
  const projectTools = [
    [3, 1],
    [4, 1],
    [5, 1],
    [7, 1],
    [8, 1],
    [10, 1],
    [2, 2],
    [3, 2],
    [4, 2],
    [5, 2],
    [6, 2],
    [7, 2],
    [8, 2],
    [10, 2],
    [1, 3],
    [6, 3],
    [7, 3],
    [7, 4],
    [8, 4],
    [9, 4],
    [10, 4],
    [11, 4],
    [12, 4],
  ];

  function createProjectTools() {
    db.query(projectToolsQuery, [projectTools], (err, rows) => {
      if (!err) console.log('The solution is: ', rows);
      else console.log(err);
    });
  }

  // Running seed functions. You can edit the params to include desired amount of inserts
  // createAdmins(numberOfAdmins);
  // createUsers(numberOfUsers);
  // createPostsAndImages(numOfPostsAndImages);
  // createUserComments(numberOfUserComments);
  // createAdminComments(numberOfAdminComments);

  // More specific queries
  createProjects();
  createTags();
  createTools();
  createProjectTags();
  createProjectTools();

  // callback('Seeding completed');
};

// Run seed function and end script process when finished
seedData();
