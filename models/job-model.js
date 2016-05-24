'use strict';

let mongoose = require('mongoose');

let jobSchema = mongoose.Schema({
  date: String,
  company: String,
  position: String,
  requiredSkills: String,
  desiredSkills: String,
  resumeUsed: String,
  foundThrough: String,
  appliedAt: String,
  offer: Boolean,
  offerDetails: String,
  interview: String,
  contact: [
    {
      type:mongoose.Schema.Types.ObjectId,
      ref: 'contacts'
    }
  ]
});

module.exports = mongoose.model('jobs', jobSchema);
