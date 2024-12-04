// models/IDCard.js
const mongoose = require('mongoose');

const idCardSchema = new mongoose.Schema({
  employeeId: { type: String, required: true, unique: true },
  cardUrl: { type: String, required: true },  // URL of the ID card image in Firebase
  generatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('IDCard', idCardSchema);
