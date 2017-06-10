var express = require('express');
var router = express.Router();
/* libraries for photo upload */
var multer = require('multer');
var upload = multer({dest: './public/post_images'});
const fs = require('fs');

module.exports = function(app, db) {
  

  router.get('/', function(req, res) {
    db.Post.findAll().exec(function(err, posts) {
      res.render('')
    })
  })

  router.get('/add', function(req, res) {
    res.render('post-add', {});
  });

  router.post('/add', upload.any(), function(req, res) {
    var ids = [];

    /* create tags */
    var tags = req.body.tags.split(",");
    console.log(tags);
    tags.forEach(function(tag) {
      tag = tag.trim();

      /* create tag */
      var tag_instance = new db.Tag({
        name: tag
      });

      tag_instance.save(function(err, elem) {
        ids.push(elem._id);
      });
    });

    setTimeout(function() {
      /* create post */
      var post = new db.Post({
        title: req.body.title,
        about: req.body.about,
        image: req.files[0].filename,
        source: req.body.source,
        content: req.body.content,
        tags: ids
      });

      post.save(function(err, post) {
        console.log(err);
        return res.redirect('/')
      });

    }, 1500);
    
  });

  router.post('/add/comment', function(req, res) {
    console.log(req.body.from);
    var comment = new db.Comment({
      text: req.body.comment,
      post_id: req.body._id,
      user_id: req.body.from,
      axilary_date: new Date().toLocaleString('ru', {
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        year: 'numeric'
      })
    });

    comment.save(function(err, user) {
      return res.redirect('/single?id=' + req.body._id);
    });
  });

  router.post('/like', function(req, res) {
    db.Sympathy.findOne({user_id: req.cookies.user._id, post_id: req.body.post_id})
    .exec(function(err, sympathy) {
      if(!sympathy) {
        var sympathy = new db.Sympathy({
          user_id: req.cookies.user._id,
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
      }
      if(sympathy.state == req.body.state) {
        return res.end();
      }
      sympathy.state = req.body.state;
      sympathy.save(function(err) {
        res.json({
          sucess: true,
          message: "Успешно сохранен"
        })
      })
    })
  });

  app.use('/posts', router);
};