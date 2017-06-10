/**
 * Seed the database
 */
var db = require('../database/index')('../database/models/*.js');
var app = require('../app');

// create some tags
const tags = [{
		name:'программирование'
	}, {
		name:'аудит'
	}, {
		name:'бизнес'
	}, {
		name:'спорт'
	}, {
		name:'tech'
	}, {
		name:'маркетинг'
	}];

db.connect(app.get('db')).connection.once('open', function() {
	for (tag of tags) {
		var instance = new db.Tag({
			name: tag.name,
		});
		
		instance.save(function (err) {
			if (err) {
				console.log(err);
			}
			console.log('Tags seeded',err);
			// saved!
		});
	}
});
