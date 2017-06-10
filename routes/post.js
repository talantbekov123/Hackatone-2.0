var express = require('express');
var router = express.Router();

module.exports = function(app, db) {

  router.get('/', function(req, res) {

  })
  
  router.post('/like', function(req, res) {
    var sympathy = new db.Sympathy({
      user_id: req.cookies.user.get('id'),
      post_id: req.body.post_id,
      state: req.body.state
    });
    sympathy.save(function(err) {
      if(err) {
        return res.json({
          success: false,
          message: "Ошибка"
        })
      }
      return res.json({
        sucess: true,
        message: "Успешно сохранен"
      })
    })
  });

  router.post('/comment', function(req, res) {
    var comment = new db.Comment({
      user_id: req.cookies.user.get('id'),
      post_id: req.body.post_id,
      text: req.body.content
    })
    comment.save(function(err) {
      if(err) {
        return res.json({
          success: false,
          message: 'ошибка'
        })
      }
      return res.json({
        success: true,
        message: "Успешно сохранен"
      })
    })
  })

  app.use('/posts', router);
};