// models/KYC.js
const mongoose = require('mongoose');

// Define KYC Schema
const kycSchema = new mongoose.Schema({
  employeeId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  idProof: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  rejectionReason: { type: String, default: '' },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

const KYC = mongoose.model('KYC', kycSchema);

module.exports = KYC;
