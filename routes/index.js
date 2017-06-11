var express = require('express');
var router = express.Router();
var KEY="trnsl.1.1.20160909T080552Z.6397520b54ae76f0.f4a12b6e4be89d263299ec70a175f538c276d914";
var translate = require('yandex-translate')(KEY);

module.exports = function(app, db) {

  router.get('/', function(req, res) {
    db.Post.find({}, function(err, posts) {
      res.render('index', {user: req.cookies.user, posts: posts});
    });
  });

  
  router.get('/untranslated', function(req, res) {
      db.Post.find({status: -1}).exec(function(err, posts) {
        res.render('index', {posts: posts, user: req.cookies.user});
      })
    })

	router.get('/exit', function(req, res) {
		res.cookie('user', null, { maxAge: 0, httpOnly: true });
		return res.redirect('/');
	});

	router.post('/login', function(req, res) {
		db.User.findOne({ login: req.body.login, password: req.body.password  }, function (err, user) {
			if(user == null) {
				db.Post.find({}, function (err, posts) {
					console.log('xxx');
					console.log(posts);
					res.render('login', {message:"Не верный логин или пароль, попробуйте заново", posts: posts});
				});
			} else {
				res.cookie('user', user );
				return res.redirect('/');
			}
		});
	});
	

	router.get('/single', function(req, res) {
		db.Comment.find({ post_id: req.query.id }).populate('user_id').exec(function(err, comments) { 
			db.Post.findOne({ _id: req.query.id }).populate('comments tags').exec(function(err, post){
        var query = {
          post_id: post._id
        }
        if(req.cookies.user) {
          query.user_id = req.cookies.user._id;
        }
				db.Sympathy.findOne(query).exec(function(err, sympathy) {
					db.Sympathy.count({post_id: post._id, state: 1}).exec(function(err, pos) {
						db.Sympathy.count({post_id: post._id, state: -1}).exec(function(err, neg) {
							db.User.findOne({id: post.user_id}).exec(function(err, user) {
								post.views = post.views + 1;
      					post.save(function(err) {
                  translate.translate(post.content,{from: "en", to: "ky"}, function(err, data) {
                    post.translatedContent = data.text[0];
                    res.render('post-single', {comments: comments, postUser: user, post: post, sympathyCount: pos - neg, sympathy: sympathy });
                  })
							  });
							})
						});
					});
				});
			});
		});
	});

  app.use('/', router);
};