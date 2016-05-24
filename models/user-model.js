'use strict';

let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

let userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email:{
    type: String,
    unique: true,
    required:true
  },
  password: {
    type: String,
    required: true
  },
  jobs: [
    {
      type:mongoose.Schema.Types.ObjectId,
      ref: 'jobs'
    }
  ],
  resumes: [
    {
      type:mongoose.Schema.Types.ObjectId,
      ref: 'resumes'
    }
  ],
  contacts: [
    {
      type:mongoose.Schema.Types.ObjectId,
      ref: 'contacts'
    }
  ]

});

userSchema.pre('save', function(next){
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
  next();
});

userSchema.methods.compareHash = function(password){
  return bcrypt.compareSync(password, this.password);
  next();
};

userSchema.methods.genToken = function(){
  return jwt.sign({id: this._id}, 'goodnessMe');
};

module.exports = mongoose.model('users', userSchema);
