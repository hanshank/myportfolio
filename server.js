const express = require('express');
const bodyParser = require('body-parser');
const pug = require('pug');
const routes = require('./routes/index');
require('dotenv').config();

const port = process.env.PORT;

const app = express();

app.use(bodyParser.json());
app.use(express.static(`${__dirname}/views/html/`));
app.use(express.static(`${__dirname}/views`));
app.set('view engine', 'pug');
app.use('/', routes);

app.listen(port, () => console.log(`Server is listening on port ${port}`));
