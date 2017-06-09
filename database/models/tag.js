var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tagSchema = new Schema({
  post_id: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  },
  name: {
    type: String,
    required: true
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

var Tag = mongoose.model('Tag', tagSchema);

module.exports = function(registry) {
  registry['Tag'] = Tag;
};