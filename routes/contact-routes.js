'use strict';

let Contact = require('../models/contacts-model');

module.exports = (router) => {
  router.post('/contacts', (req, res) => {
    let newContact = new Contact(req.body);
    newContact.save((err, contact) => {
      if(err) res.send(err);
      res.send(contact);
    });
  })

  .get('/contacts', (req, res) => {
    Contact.find({}, (err, contacts) => {
      if(err) res.send(err);
      res.send(contacts);
    });
  })

  .get('/contacts/:id', (req, res) => {
    Contact.findById(req.params.id, (err, contact) => {
      if(err) res.send(err);
      res.send(contact);
    });
  })

  .put('/contacts/:id', (req, res) => {
    Contact.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, contact) => {
      if(err) res.send(err);
      res.send(contact);
    });
  })

  .delete('/contacts/:id', (req, res) => {
    Contact.findById(req.params.id, (err, contact) => {
      if(err) res.send(err);
      contact.remove(() => {
        res.send('Contact Removed');
      });
    });
  });
};
