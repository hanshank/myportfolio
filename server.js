const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const session = require('express-session');
const passport = require('passport');
const { isAuthenticated, showLogin } = require('./middleware/auth');
require('dotenv').config();

const port = process.env.SERVER_PORT;

const router = require('./routes/index');
const adminRouter = require('./routes/admin/index');

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
app.use(cookieParser());
app.use('/admin/login', showLogin);
app.use('/admin', isAuthenticated, adminRouter);
app.use('/', router);

app.listen(port, () => console.log(`Server is listening on port ${port}`));
