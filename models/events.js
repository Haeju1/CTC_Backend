const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  id: Number,
  title: String,
  description: String,
  food:  String,
  time: String,
  location: String
});

const $event = mongoose.model('event', eventSchema);

module.exports = $event;
