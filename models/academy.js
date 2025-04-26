const mongoose = require('mongoose');

const academySchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  sportsOffered: [{ type: String, required: true }],
  contact: { type: String, required: true }
});

module.exports = mongoose.model('Academy', academySchema);
