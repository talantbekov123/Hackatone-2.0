var express = require('express');
var router = express.Router();

module.exports = function(app, db) {

	router.get('/', function(req, res) {
		db.Post.find({}, function(err, posts) {
			res.render('index', {user: req.cookies.user, posts: posts});
		});
	});

	router.get('/register', function(req, res) {
		db.Post.find({}, function(err, posts) {
			res.render('register', {});
		});
	});

	router.post('/login', function(req, res) {
		db.User.findOne({ login: req.body.login, password: req.body.password  }, function (err, user) {
			if(user == null) {
				res.render('/', { message: 'Не верный логин или пароль.' });
			}
			else {
				res.cookie('user', user );
				console.log(user);
				return res.redirect('/');
			}
		});
	});
	

	router.get('/single', function(req, res) {
		db.Comment.find({ post_id: req.query.id }).populate('user_id').exec(function(err, comments) { 
			db.Post.findOne({ _id: req.query.id }).populate('comments').exec(function(err, post){ 
				db.Sympathy.findOne({post_id: post._id, user_id: req.cookies.user._id}).exec(function(err, sympathy) {
					db.Sympathy.count({post_id: post._id, state: 1}).exec(function(err, pos) {
						db.Sympathy.count({post_id: post._id, state: -1}).exec(function(err, neg) {
							db.User.findOne({id: post.user_id}).exec(function(err, user) {
								res.render('post-single', {comments: comments, user: user, post: post, sympathyCount: pos - neg, sympathy: sympathy });
							})
						});
					});
				});
			});
		});
	});

	app.use('/', router);
};