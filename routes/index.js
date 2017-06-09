var express = require('express');
var router = express.Router();

module.exports = function(app, db) {
	router.get('/', function(req, res) {
		db.Post.find({}, function(err, posts){
			res.render('index', {posts: posts});
		});
	});
	
	app.use('/', router);
};