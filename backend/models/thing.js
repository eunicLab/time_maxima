
			const mongoose = require('mongoose');

			const thingSchema = mongoose.Schema({
  			text: { type: String, required: true },
  			date: { type: String, required: false },
  			time: { type: String, required: false },
  					});

			module.exports = mongoose.model('Thing', thingSchema);