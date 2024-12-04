const express = require('express');
const router = express.Router();
const SalaryStructure = require('../models/SalaryStructure');

// Create Salary Structure
router.post('/salary-structures', async (req, res) => {
  try {
    const { role, baseSalary, allowances, bonuses, deductions, tax, otherBenefits } = req.body;
    const salaryStructure = new SalaryStructure({
      role, baseSalary, allowances, bonuses, deductions, tax, otherBenefits
    });
    await salaryStructure.save();
    res.status(201).json({ message: 'Salary structure created successfully', salaryStructure });
  } catch (error) {
    res.status(500).json({ message: 'Error creating salary structure', error });
  }
});

// Get all Salary Structures
router.get('/salary-structures', async (req, res) => {
  try {
    const salaryStructures = await SalaryStructure.find();
    res.status(200).json({ salaryStructures });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching salary structures', error });
  }
});

module.exports = router;
