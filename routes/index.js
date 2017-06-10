var express = require('express');
var router = express.Router();

module.exports = function(app, db) {

	router.get('/', function(req, res) {
		db.Post.find({}, function(err, posts) {
			res.render('index', {});
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
		res.render('post-single', {});
	});

	app.use('/', router);
};