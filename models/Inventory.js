// models/Inventory.js
const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  uniformType: { type: String, required: true },
  size: { type: String, required: true },
  quantityInStock: { type: Number, required: true },
  lastUpdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Inventory', inventorySchema);
