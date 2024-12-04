// models/UniformRequest.js
const mongoose = require('mongoose');

const uniformRequestSchema = new mongoose.Schema({
    employeeId: {
      type: String, 
      ref: 'Employee', // Optional: If you want to populate Employee data later
      required: true
    },
    uniformType: {
      type: String,
      required: true
    },
    size: {
      type: String,
      required: true
    },
    status: {
      type: String,
      default: 'Pending'
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId, // Use ObjectId for approvedBy
      ref: 'Manager', // Optional: Reference to the manager who approves the request
      required: false
    },
  });
  

module.exports = mongoose.model('UniformRequest', uniformRequestSchema);
