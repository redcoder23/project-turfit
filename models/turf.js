const mongoose = require('mongoose');

const turfSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  sportsavailable: [{ type: String, required: true }],
  priceperhour: { type: Number, required: true },
  contact: { type: String, required: true }
});

module.exports = mongoose.model('Turf', turfSchema);
