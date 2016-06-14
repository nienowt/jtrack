'use strict';

let mongoose = require('mongoose');

let jobSchema = mongoose.Schema({
  date: String,
  company: String,
  position: String,
  description: String,
  requiredSkills: String,
  desiredSkills: String,
  resumeUsed: String,
  foundThrough: String,
  appliedAt: String,
  interest:String,
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'events'
    }
  ],
  contact: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'contacts'
    }
  ]
});

module.exports = mongoose.model('jobs', jobSchema);
