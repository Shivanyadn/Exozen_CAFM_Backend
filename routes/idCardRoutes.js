// routes/idCardRoutes.js
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { generateIdCard } = require('../utils/generateIdCard');
const Employee = require('../models/Employee');  // Employee model

router.post('/:employeeId/generate', async (req, res) => {
  try {
    const employeeId = req.params.employeeId;

    // Find employee by custom employeeId
    const employee = await Employee.findOne({ employeeId });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Generate ID Card
    const idCard = await generateIdCard(employee);
    res.status(200).json({ message: 'ID Card generated successfully', idCard });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error generating ID card', error: error.message });
  }
});



module.exports = router;
