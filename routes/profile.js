var express = require('express');
var router = express.Router();

module.exports = function(app) {

	router.get('/', function(req, res) {
		db.User.findOne({ _id: req.query.id }, function (err, user) {
			console.log(user);
			res.render('profile', {user: user});
		});
	});

	app.use('/profile', router);
};