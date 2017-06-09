var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
		title: {
			type: String,
			required: true
		}, 
		image: {
			type: String
		},
		source: {
			type: String,
			required: true
		},
		content: {
			type: String,
			required: true
		},
		views: {
			type: Number,
			default: 0,
			required: true
		}
	}, {
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	}
});

var Post = mongoose.model('Post', postSchema);

module.exports = function(registry) {
	registry['Post'] = Post;
};