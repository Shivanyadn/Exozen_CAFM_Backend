const express = require('express');
const router = express.Router();
const Payslip = require('../models/Payslip');
const SalaryStructure = require('../models/SalaryStructure');
const Employee = require('../models/Employee'); // Corrected the import path


// Generate Payslip
router.post('/:employeeId/:salaryStructureId', async (req, res) => {
  try {
    const { employeeId, salaryStructureId } = req.params;
    const employee = await Employee.findById(employeeId); // Fetch employee details
    const salaryStructure = await SalaryStructure.findById(salaryStructureId); // Fetch salary structure

    if (!employee || !salaryStructure) {
      return res.status(404).json({ message: 'Employee or Salary Structure not found' });
    }

    const earnings = salaryStructure.baseSalary + salaryStructure.allowances + salaryStructure.bonuses;
    const deductions = salaryStructure.deductions + salaryStructure.tax;
    const netSalary = earnings - deductions;

    const payslip = new Payslip({
      employeeId,
      salaryStructureId,
      earnings,
      deductions,
      netSalary,
      month: new Date().toLocaleString('default', { month: 'long' }),
      year: new Date().getFullYear(),
    });

    await payslip.save();
    res.status(201).json({ message: 'Payslip generated successfully', payslip });
  } catch (error) {
    res.status(500).json({ message: 'Error generating payslip', error });
  }
});

// Get Payslip by Employee ID
router.get('/:employeeId', async (req, res) => {
  try {
    const payslips = await Payslip.find({ employeeId: req.params.employeeId });
    res.status(200).json({ payslips });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching payslips', error });
  }
});

module.exports = router;
