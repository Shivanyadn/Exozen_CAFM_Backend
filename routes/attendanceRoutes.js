const express = require('express');
const { checkIn, checkOut, dailyReport, weeklyReport, monthlyReport } = require('../controllers/attendanceController');
const router = express.Router();

// Check-in Route
router.post('/check-in', checkIn);

// Check-out Route
router.post('/check-out', checkOut);

// Daily Report Route
router.get('/daily-report', dailyReport);

// Weekly Report Route
router.get('/weekly-report', weeklyReport);

// Monthly Report Route
router.get('/monthly-report', monthlyReport);

module.exports = router;
