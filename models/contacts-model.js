'use strict';

let mongoose = require('mongoose');

let contactSchema = mongoose.Schema({
  name: String,
  company: String,
  indRecruiter: Boolean,
  email: String,
  phone: String
});

module.exports = mongoose.model('contacts', contactSchema);
