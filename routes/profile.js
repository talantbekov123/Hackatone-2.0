var express = require('express');
var router = express.Router();

module.exports = function(app) {

	router.get('/', function(req, res) {
		db.User.findOne({ _id: req.query.id }).populate('posts').exec(function (err, user) {
			res.render('profile', {user: user, posts: user.posts});
		});
	});

	app.use('/profile', router);
};