'use strict';

let jwt = require('jsonwebtoken');

module.exports = exports = function(req, res, next) {
  let decoded;
  try{
    let token = req.headers.token;
    decoded = jwt.verify(token, 'goodnessMe');
    req.headers.decodedToken = decoded;
    next();
  }
  catch(e){
    res.status(401).json({msg: 'Unauthorized'});
  }
};
