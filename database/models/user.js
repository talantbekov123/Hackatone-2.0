var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  firstname: {
    type: String,
    required: true
  }, 
  lastname: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  permission: {
    type: Number,
    default: 0
  },
  password: {
    type: String,
    required: true
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