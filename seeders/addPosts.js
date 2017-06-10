/**
 * Seed the database
 */
var db = require('../database/index')('../database/models/*.js');
var app = require('../app');

// create some tags
db.connect(app.get('db')).connection.once('open', function() {
	db.Tag.find({}).exec(function(err, tags) {
		const posts = [{
			title: 'title',
			about: 'about1',
			image: 'post1',
			source: 'http://prokg.org/',
			content: 'content',
			tags: [ { tag: tags[2]._id } ]
		}]

		for (post of posts) {
			var instance = new db.Post({
				title: post.title,
				about: post.about,
				image: post.image,
				source: post.source,
				content: post.content,
				tags: post.tags
			});
			
			instance.save(function (err) {
				if (err) {
					console.log(err);
				}
				console.log('Posts seeded',err);
				// saved!
			});
		}
	});
});
