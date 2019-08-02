const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();

const port = process.env.SERVER_PORT;

const router = require('./routes/index');

const app = express();

app.use(bodyParser.json());
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
// Auth
app.use(
  session({
    secret: 'asfsafsakfksakflaskflvhuh38dhn',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use('/', router);

app.listen(port, () => console.log(`Server is listening on port ${port}`));
