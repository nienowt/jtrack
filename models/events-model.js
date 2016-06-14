'use strict';

let mongoose = require('mongoose');

let eventSchema = mongoose.Schema({
  name: String,
  type: String,
  date: String,
  location: String,
  details: String
});

module.exports = mongoose.model('events', eventSchema);
