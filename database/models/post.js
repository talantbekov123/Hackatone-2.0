var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
	title: {
		type: String
	},
	about: {
		type: String
	},
	image: {
		type: String
	},
	source: {
		type: String
	},
	content: {
		type: String
	},
	status: {
		type: Number,
		default: 1
	},
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
	views: {
		type: Number,
		default: 0,
		required: true
	},
	tags: [{
		type: Schema.Types.ObjectId,
		ref: 'Tag'
	}],
	axilary_date: {
		type: String,
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