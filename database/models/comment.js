var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
  post_id: {
    type: Schema.Types.ObjectId,
    ref: 'Post' 
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  text: {
    type: String,
    required: true
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

var Comment = mongoose.model('Comment', commentSchema);

module.exports = function(registry) {
  registry['Comment'] = Comment;
};