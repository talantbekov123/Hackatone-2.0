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
		db.Post.findOne({ _id: req.query.id }, function(err, post) {
			res.render('post-single', {post: post});
		});
	});

	app.use('/', router);
};