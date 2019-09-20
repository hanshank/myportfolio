const express = require('express');

// DATABASE
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const session = require('express-session');
const passport = require('passport');
const db = require('./config/db.js');
const { isAuthenticated } = require('./middleware/auth');
require('dotenv').config();

const port = process.env.SERVER_PORT;

const router = require('./routes/index');
const adminRouter = require('./routes/admin/index');

// Test database connection
db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const app = express();

app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
  })
);
app.use(express.static(`${__dirname}/views/html/`));
app.use(express.static(`${__dirname}/views`));
app.set('view engine', 'pug');

app.use(cookieParser());
app.use('/admin', isAuthenticated, adminRouter);
app.use('/', router);

app.listen(port, () => console.log(`Server is listening on port ${port}`));
