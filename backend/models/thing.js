const mongoose = require('mongoose');

const thingSchema = mongoose.Schema({
  text: { type: String, required: true },
  date: { type: String, required: false },
  time: { type: String, required: false },
  email: { type: String, required: true },
  username: { type: String, required: true }
});

module.exports = mongoose.model('Thing', thingSchema);
