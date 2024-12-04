const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  employeeId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  idProof: { type: String, required: true },
  status: { type: String, required: true },
  rejectionReason: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Employee', EmployeeSchema, 'kycs'); // 'kycs' specifies the collection name
