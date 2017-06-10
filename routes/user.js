var express = require('express');
var router = express.Router();

module.exports = function(app, db) {

  
  router.get('/rating', function(req, res) {
    db.User.findAll().exec(function(err, posts) {
      
    })
  })
  app.use('/users', router);
};