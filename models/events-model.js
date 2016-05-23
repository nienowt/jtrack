'use strict';

let mongoose = require('mongoose');

let eventSchema = mongoose.Schema({
  name: String,
  date: String,
  location: String,
  details: String
});

module.exports = mongoose.Schema('events', eventSchema);
