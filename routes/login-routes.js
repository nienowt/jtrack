'use strict';

let User = require(__dirname + '/../models/user-model.js');

module.exports = (router) => {

  router.post('/signup', (req, res) => {
      let newUser = new User(req.body);
      newUser.save((err, user) => {
        if (!user) {
          console.log(err);
          res.send('Name Taken');
        }
        if(user) res.send('User created!');
      });
    });

  router.get('/login', (req, res) => {
      let based = req.headers.authorization.split(' ')[1];
      let authArr = new Buffer(based, 'base64').toString().split(':');
      User.findOne({email:authArr[0]}, (err, user) => {
        if(err || !user) {
          return res.status(401).json({msg:'Error'});
        }
        let valid = user.compareHash(authArr[1]);
        if(!valid) {
          return res.status(401).json({msg: 'Invalid Login'});
        } else {
          res.send({token: user.genToken(), id: user._id});
        }
      });
    });
};
