var express = require('express');
var router = express.Router();

module.exports = function(app, db) {

  router.post('/register', function(req, res) {
    db.User.find({email: req.body.email}).exec(function(err, user) {
      if(err) {
        return res.json({
          success: false,
          message: "Error"
        })
      }
      var user = new db.User({
        email: req.body.mail,
        
      })
    })
  });
  
  router.get('/rating', function(req, res) {
    db.User.findAll().exec(function(err, posts) {
      db.
    })
  })
  app.use('/users', router);
};