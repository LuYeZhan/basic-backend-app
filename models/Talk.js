const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const talkSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  audio: {
    type: String
  },
  creator: {
    type: ObjectId,
    ref: 'User'
  },
  tags: [String]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Talk = mongoose.model('Talk', talkSchema);

module.exports = Talk;
