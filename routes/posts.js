var express = require('express');
var router = express.Router();
/* libraries for photo upload */
var multer = require('multer');
var upload = multer({dest: './public/post_images'});
const fs = require('fs');

module.exports = function(app) {


	router.get('/add', function(req, res) {
		res.render('post-add', {});
	});

	router.post('/add', upload.any(), function(req, res) {
		var ids = [];

		/* create tags */
		var tags = req.body.tags.split(",");
		console.log(tags);
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

		setTimeout(function() {
			/* create post */
			var post = new db.Post({
				title: req.body.title,
				about: req.body.about,
				image: req.files[0].filename,
				source: req.body.source,
				content: req.body.content,
				tags: ids
			});

			post.save(function(err, post) {
				console.log(err);
				return res.redirect('/')
			});

		}, 1500);
		
	});

	router.post('/add/comment', function(req, res) {
		var comment = new db.Comment({
			text: req.body.text,
			post_id: req.body._id,
			from: req.body.from,
			axilary_date: new Date().toLocaleString('ru', {
				month: 'long',
				day: 'numeric',
				hour: 'numeric',
				minute: 'numeric',
				year: 'numeric'

			})
		});

		comment.save(function(err, user) {
			return res.redirect('/posts/single?_id=' + req.body._id);
		});
	});

	app.use('/posts', router);
};