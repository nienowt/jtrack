'use strict';

let Event = require('../models/events-model.js');
let User = require('../models/user-model.js');
let Job = require('../models/job-model.js');

module.exports = (router) => {

  router.post('/events/user/:id', (req,res) => {
    let data = {};
    let newEvent = new Event(req.body.evt)
    newEvent.save((err, evt) => {
      if (err) res.send(err);
      data.evt = evt;
    });

    if (req.body.jobId){
      Job.findByIdAndUpdate(req.body.jobId, {push: {'events': newEvent._id}}, {new: true}, (err, job) => {
        if (err) res.send(err);
        data.job = job;
      })
    }

    User.findByIdAndUpdate(req.params.id, {$push: {'events': newEvent._id}}, {new: true}, (err, user) => {
      if (err) res.send(err);
      data.user = user;
      res.send(data);
    });
  })

  .put('/events/:id', (req, res) => {
    Event.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, evt) => {
      if (err) res.send(err);
      res.send(evt)
    })
  })

}
