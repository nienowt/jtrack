'use strict';

let express = require('express');
let app = express();
// let client = express().use(express.static(__dirname + '/build'))
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:db');

app.use(express.static(__dirname + '/build'))
let router = express.Router();

app.use(bodyParser.json());

require('./routes/login-routes')(router);
require('./routes/job-routes')(router);
require('./routes/contact-routes')(router);
require('./routes/event-routes')(router);

app.use('/', router)

// client.listen(8080, () => {
//   console.log('client 8080');
// });

app.listen(3000, () => {
  console.log('live three! thousand!');
});
