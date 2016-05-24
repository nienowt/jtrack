'use strict';

let User = require('../models/user-model');
let Job = require('../models/job-model');
let Contact = require('../models/contacts-model');
let auth = require('../lib/auth');

module.exports = (router) => {

  router.post('/jobs/user/:id', (req,res) => {
    console.log('post jobs hit');
    let newJob = new Job(req.body.job);
    let newContact = new Contact(req.body.contact);
    newContact.save((err, contact) => {
      if (err) res.send(err);
    })
    newJob.save((err, job) => {
      if (err) res.send(err);
    })
    User.findByIdAndUpdate(req.params.id, {$push: {'contacts': newContact._id, 'jobs': newJob._id}},{new: true}, (err, user) => {
        if(err) res.send(err);
        res.send(user)
    });
  })

  .get('/jobs/user/:id', (req, res) => {
    User.findById(req.params.id)
    .populate({
      path: 'jobs',
      populate: {path: 'contacts'}
    }).exec((err, user) => {
      if(err) res.send(err);
      res.send(user)
    });
    // Job.find({})
    //   .populate('contacts')
    //   .exec((err, jobs) => {
    //     res.send(jobs)
    //   });
  })

  .get('/jobs/:id', (req, res) => {
    Job.findById(req.params.id)
      .populate('contacts')
      .exec((err, job) => {
        if(err) res.send(err);
        res.send(job);
      });
  })

  .put('/jobs/:id', (req, res) => {
    Job.findByIdAndUpdate(req.params.id, req.body.job, {new: true}, (err, job) => {
      if(err) res.send(err);
      Contact.findByIdAndUpdate(job.contact, req.body.contact, {new:true}, (err, contact) => {
        if(err) res.send(err);
      });
      res.send(job)
    });
  })

  .delete('/jobs/:id', (req, res) => {
    Job.findById(req.params.id, (err, job) => {
      if(err) res.send(err);
      job.remove(() => {
        res.send('Job Removed')
      });
    });
  });
};
