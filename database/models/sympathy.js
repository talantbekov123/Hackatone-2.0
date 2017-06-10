var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sympathySchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  post_id: {
    type: Schema.Types.ObjectId,
    ref: "Post"
  },
  state: {
    type: Number,
    required: true
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

var Sympathy = mongoose.model('Sympathy', sympathySchema);

module.exports = function(registry) {
  registry['Sympathy'] = Sympathy;
};