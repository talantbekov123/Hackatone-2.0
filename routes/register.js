var express = require('express');
var router = express.Router();
/* libraryes for fb oath */
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
var status;

module.exports = function(app, db) {
	
	/* Facebook user sign in */
	router.get('/fb/callback', function(req, res, next ){

		/* axilary user status */
		if(req.query.status) {
			status = req.query.status;
		}
		passport.authenticate('facebook', function(profile) {
			
			/* developt this part not finished */
			db.User.findOne({ fb_id: profile._json.id  }, function (err, user) {
				if(err) {
					throw err;
				}
		    	/* create user with fb data */
		    	if(user == null) {
		    		var instance = new db.User({
		    			firstname: profile._json.first_name,
		    			lastname: profile._json.last_name,
		    			fb_id: profile._json.id
					});
					instance.save(function(err, user) {

						console.log(err);
						if(err) {
							throw err;
						}
						res.cookie('user', user );
						return res.redirect('/');
					});
		    	}
		    	else {
		    		res.cookie('user', user );
					return res.redirect('/');
		    	}
		    });
		})(req, res, next);
	});

	router.get('/', function(req, res) {
		res.render('register', { message: [], user: req.cookies.user });
	});

	router.post('/', function(req, res) {
		var user = new db.User({
			login: req.body.login,
			password: req.body.password
		});
		user.save(function(err, user) {
			res.cookie('user', user );
			return res.redirect('/');
		});
	});
	
	app.use('/register', router);
};