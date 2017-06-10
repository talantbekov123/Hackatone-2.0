var express = require('express');
var router = express.Router();

module.exports = function(app, db) {

	router.get('/', function(req, res) {
		db.Post.find({}, function(err, posts) {
			res.render('index', {posts: posts});
		});
	});

	router.get('/register', function(req, res) {
		db.Post.find({}, function(err, posts) {
			res.render('register', {});
		});
	});

	router.get('/register', function(req, res) {
		db.Post.find({}, function(err, posts) {
			res.render('register', {});
		});
	});
	

	router.get('/single', function(req, res) {
		db.Post.findOne({ _id: req.query.id }, function(err, post) {
			res.render('post-single', {post: post});
		});
	});

	app.use('/', router);
};