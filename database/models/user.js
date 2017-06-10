var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	login: {
		type: String,
		unique: true,
		sparse: true
	},
	fb_id: {
		type: String,
		unique: true,
		sparse: true
	},
	firstname: {
		type: String
	}, 
	lastname: {
		type: String
	},
	email: {
		type: String
	},
	permission: {
		type: Number,
		default: 0
	},
	password: {
		type: String
	}
}, {
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	}
});

var User = mongoose.model('User', userSchema);

module.exports = function(registry) {
	registry['User'] = User;
};