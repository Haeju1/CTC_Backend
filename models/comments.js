const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  id: Number,
  text: String,
  user: String,
  eventId: Number
});

const comment = mongoose.model('comment', commentSchema);

module.exports = comment;
