'use strict';

let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:db');

let router = express.Router();

app.use(bodyParser.json());

require('./routes/login-routes')(router);
require('./routes/job-routes')(router);
require('./routes/contact-routes')(router);

app.use('/', router)

app.listen(3000, () => {
  console.log('live three! thousand!');
});
