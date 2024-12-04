// routes/kycRoutes.js
const express = require('express');
const router = express.Router();
const KYC = require('../models/KYC');

// Insert new KYC form
router.post('/submit', async (req, res) => {
  try {
    const { employeeId, firstName, lastName, address, phoneNumber, email, dateOfBirth, idProof } = req.body;
    
    // Check if KYC already exists for the employee
    const existingKYC = await KYC.findOne({ employeeId });
    if (existingKYC) {
      return res.status(400).json({ message: 'KYC form already submitted for this employee' });
    }

    // Create new KYC document
    const newKYC = new KYC({
      employeeId,
      firstName,
      lastName,
      address,
      phoneNumber,
      email,
      dateOfBirth,
      idProof
    });

    // Save the new KYC form to the database
    await newKYC.save();

    res.status(201).json({ message: 'KYC form submitted successfully', newKYC });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting KYC form', error });
  }
});


// Preview and Fetch KYC Form
router.get('/:employeeId', async (req, res) => {
  try {
    const kycData = await KYC.findOne({ employeeId: req.params.employeeId });
    if (!kycData) {
      return res.status(404).json({ message: 'KYC form not found' });
    }
    res.status(200).json({ message: 'KYC form retrieved successfully', kycData });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching KYC form', error });
  }
});

// Approve KYC Form
router.post('/:employeeId/approve', async (req, res) => {
  try {
    const kyc = await KYC.findOneAndUpdate(
      { employeeId: req.params.employeeId },
      { status: 'Approved' },
      { new: true }
    );
    if (!kyc) {
      return res.status(404).json({ message: 'KYC form not found' });
    }
    res.status(200).json({ message: 'KYC form approved successfully', kyc });
  } catch (error) {
    res.status(500).json({ message: 'Error approving KYC form', error });
  }
});


// Reject KYC Form
router.post('/:employeeId/reject', async (req, res) => {
  try {
    const { reason } = req.body;
    const kyc = await KYC.findOneAndUpdate(
      { employeeId: req.params.employeeId },
      { status: 'Rejected', rejectionReason: reason },
      { new: true }
    );
    if (!kyc) {
      return res.status(404).json({ message: 'KYC form not found' });
    }
    res.status(200).json({ message: 'KYC form rejected successfully', kyc });
  } catch (error) {
    res.status(500).json({ message: 'Error rejecting KYC form', error });
  }
});

// Update KYC Form
router.put('/:employeeId', async (req, res) => {
  try {
    const updatedKYC = await KYC.findOneAndUpdate(
      { employeeId: req.params.employeeId },
      req.body,
      { new: true }
    );
    if (!updatedKYC) {
      return res.status(404).json({ message: 'KYC form not found' });
    }
    res.status(200).json({ message: 'KYC form updated successfully', updatedKYC });
  } catch (error) {
    res.status(500).json({ message: 'Error updating KYC form', error });
  }
});

module.exports = router;
