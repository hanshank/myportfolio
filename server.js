const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes/index');
require('dotenv').config();

const port = process.env.PORT;

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/', routes);
app.listen(port, () => console.log(`Server is listening on port ${port}`));
