const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'User', 'Manager'], default: 'User' },
  projects: [String],
  resetToken: String,
  resetTokenExpire: Date,
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
