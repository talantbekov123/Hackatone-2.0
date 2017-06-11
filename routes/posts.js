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

  router.post('/:id/update', upload.any(), function(req, res) {
    console.log(req.body);
    db.Post.findOne({_id: req.params.id}).exec(function(err, post) {
      if(!post) {
        return res.json({
          sucess: false,
          message: "Post not found"
        })
      }
      var ids = [];
      var tags = req.body.tags.split(",") || null;

      if(req.body.tags) {
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
      }
      console.log(req.files);
      setTimeout(function() {
        /* create post */
        
          post.title = req.body.title,
          post.about = req.body.about,
          post.image = req.files.length > 0 ? req.files[0].filename : '',
          post.source = req.body.source,
          post.content = req.body.text,
          post.tags = ids,
          post.axilary_date = new Date().toLocaleString('ru', {
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            year: 'numeric'
          })
        post.save(function(err, post) {
          console.log(err);
          return res.redirect('/')
        });
      }, 1500);
    })
  })
  router.post('/add', upload.any(), function(req, res) {
    var ids = [];

    /* create tags */
    var tags = req.body.tags.split(",") || null;

    if(req.body.tags) {
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
    }
    console.log(req.files);
    setTimeout(function() {
      /* create post */
      var post = new db.Post({
        title: req.body.title,
        about: req.body.about,
        status: req.body.status,
        image: req.files.length > 0 ? req.files[0].filename : '',
        source: req.body.source,
        content: req.body.text,
        tags: ids,
        axilary_date: new Date().toLocaleString('ru', {
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          year: 'numeric'
        })
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
  router.get('/my/add', function(req, res) {
    db.User.findOne({_id: req.cookies.user._id}).exec(function(err, user) {
      user.posts.push(req.query.post_id);
      db.Post.update({id: req.query.post_id}, {status: 0}, function(err) {
        user.save(function(err) {
          res.redirect('/');
        })
      });
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
          console.log("asdasd");
          return res.json({
            sucess: true,
            message: "Успешно сохранен"
          })
        })
      } else {
        console.log('cheeck');
        if(sympathy.state == req.body.state) {
          return res.json({
            sucess: true,
            message: "exists"
          });
        }
        sympathy.state = req.body.state;
        sympathy.save(function(err) {
          res.json({
            sucess: true,
            message: 'updated'
          })
        })
    }
    })
  });

  app.use('/posts', router);
};