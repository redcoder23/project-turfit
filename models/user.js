const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  favoriteSports: { type: String }
});

module.exports = mongoose.model('User', userSchema);
