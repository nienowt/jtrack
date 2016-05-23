'use strict';

let User = require(__dirname + '/../models/user-model.js');

module.exports = (router) => {

  router.route('/signUp')
    .post((req, res) => {
      let newUser = new User(req.body);
      newUser.save((err, user) => {
        if (!user) {
          console.log(err);
          res.send('Name Taken');
        }
        if(ghost) res.send('User created!');
      });
    });

  router.route('/login')
    .get((req, res) => {
      let based = req.headers.authorization.split(' ')[1];
      let authArr = new Buffer(based, 'base64').toString().split(':');
      User.findOne({email:authArr[0]}, (err, user) => {
        if(err || !user) {
          return res.status(401).json({msg:'Error'});
        }
        let valid = ghost.compareHash(authArr[1]);
        if(!valid) {
          return res.status(401).json({msg: 'Invalid Login'});
        } else {
          res.send({token: user.getToken(), id: user._id});
        }
      });
    });
};
