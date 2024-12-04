// routes/uniformRequest.js
const express = require('express');
const router = express.Router();
const UniformRequest = require('../models/UniformRequest');
const Inventory = require('../models/Inventory');
const mongoose = require('mongoose');

// Submit a uniform request
router.post('/:employeeId/submit', async (req, res) => {
  const { uniformType, size } = req.body;
  const employeeId = req.params.employeeId;  // This will now be a string (e.g., 'EFMS0001')

  try {
    const uniformRequest = new UniformRequest({
      employeeId,   // Store as a string, no need for ObjectId conversion
      uniformType,
      size,
    });

    await uniformRequest.save();
    res.status(201).json({ message: 'Uniform request submitted successfully', uniformRequest });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting uniform request', error });
  }
});


router.post('/:uniformRequestId/approve', async (req, res) => {
    try {
      const uniformRequestId = req.params.uniformRequestId;
      const { status, approvedBy } = req.body;
  
      // Check if approvedBy is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(approvedBy)) {
        return res.status(400).json({ message: 'Invalid ObjectId format for approvedBy' });
      }
  
      // Correct way to instantiate ObjectId
      const approvedByObjectId = new mongoose.Types.ObjectId(approvedBy);
  
      const uniformRequest = await UniformRequest.findByIdAndUpdate(
        uniformRequestId,
        { 
          status: status || 'Approved', // Default to "Approved" if no status is provided
          approvedBy: approvedByObjectId
        },
        { new: true } // Return the updated document
      );
  
      if (!uniformRequest) {
        return res.status(404).json({ message: 'Uniform request not found' });
      }
  
      res.status(200).json({ message: 'Uniform request approved successfully', uniformRequest });
    } catch (error) {
      console.error(error);  // Log the error for debugging
      res.status(500).json({ message: 'Error processing uniform request', error: error.message });
    }
  });

  
  
  module.exports = router;
  
