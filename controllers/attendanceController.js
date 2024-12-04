const Attendance = require('../models/Attendance');

// Check-in API
const checkIn = async (req, res) => {
  try {
    const { employeeId } = req.body;
    
    const newAttendance = new Attendance({
      employeeId,
      checkInTime: new Date(),
    });

    await newAttendance.save();
    res.status(200).json({ message: 'Checked in successfully', attendance: newAttendance });
  } catch (error) {
    res.status(500).json({ message: 'Error checking in', error });
  }
};

// Check-out API
const checkOut = async (req, res) => {
    try {
      const { employeeId } = req.body;
      const attendance = await Attendance.findOne({ employeeId, checkOutTime: null }).sort({ date: -1 });
      
      if (!attendance) {
        return res.status(400).json({ message: 'No active check-in found for this employee' });
      }
  
      attendance.checkOutTime = new Date();
      await attendance.save();
      
      res.status(200).json({ message: 'Checked out successfully', attendance });
    } catch (error) {
      res.status(500).json({ message: 'Error checking out', error });
    }
  };

  // Daily Report API
  const dailyReport = async (req, res) => {
    try {
      const today = new Date();
      const startOfDay = new Date(today.setHours(0, 0, 0, 0));
      const endOfDay = new Date(today.setHours(23, 59, 59, 999));
 
      console.log('Start of Day:', startOfDay);
      console.log('End of Day:', endOfDay);
 
      const dailyAttendance = await Attendance.find({
        date: { $gte: startOfDay, $lte: endOfDay }
      });
 
      res.status(200).json({ message: 'Daily report fetched successfully', dailyAttendance });
    } catch (error) {
      res.status(500).json({ message: 'Error generating daily report', error });
    }
 };
 
  
  // Weekly Report API
const weeklyReport = async (req, res) => {
    try {
      const today = new Date();
      const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
      const lastDayOfWeek = new Date(today.setDate(firstDayOfWeek.getDate() + 6));
  
      const weeklyAttendance = await Attendance.find({
        date: { $gte: firstDayOfWeek, $lte: lastDayOfWeek }
      });
  
      res.status(200).json({ message: 'Weekly report fetched successfully', weeklyAttendance });
    } catch (error) {
      res.status(500).json({ message: 'Error generating weekly report', error });
    }
  };
  
  // Monthly Report API
const monthlyReport = async (req, res) => {
    try {
      const today = new Date();
      const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  
      const monthlyAttendance = await Attendance.find({
        date: { $gte: firstDayOfMonth, $lte: lastDayOfMonth }
      });
  
      res.status(200).json({ message: 'Monthly report fetched successfully', monthlyAttendance });
    } catch (error) {
      res.status(500).json({ message: 'Error generating monthly report', error });
    }
  };
  
  module.exports = { checkIn, checkOut, dailyReport, weeklyReport, monthlyReport };
