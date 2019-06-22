// seed file yeahssssasfassassasdssss
const fetch = require('node-fetch');
const mysql = require('mysql');
const faker = require('faker');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
});

const numOfPostsAndImages = 50;
const numberOfUserComments = 300;
const numberOfAdminComments = 40;

const numberOfAdmins = 1;
const numberOfUsers = 20;

const seedData = () => {
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
      db.query(
        'INSERT INTO posts SET ?',
        {
          title: faker.lorem.words(),
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
      db.query(
        'INSERT INTO images SET ?',
        {
          url: 'https://source.unsplash.com/random',
          post_id: i + 1,
          created_at: faker.date.past(),
        },
        function(err, rows) {
          if (!err) console.log('The solution is: ', rows);
          else console.log(err);
        }
      );
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
  db.connect();

  // Running seed functions. You can edit the params to include desired amount of inserts
  createAdmins(numberOfAdmins);
  createUsers(numberOfUsers);
  createPostsAndImages(numOfPostsAndImages);
  createUserComments(numberOfUserComments);
  createAdminComments(numberOfAdminComments);

  // Closes current mysql db connection
  db.end();
};

seedData();
