const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  employeeId: {
    type: String,  // Change from ObjectId to String
    required: true
  },
  checkInTime: {
    type: Date,
    required: true
  },
  checkOutTime: {
    type: Date
  },
  // Other fields for attendance
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
