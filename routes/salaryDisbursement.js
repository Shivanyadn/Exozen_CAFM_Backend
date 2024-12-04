const express = require('express');
const router = express.Router();
const SalaryDisbursement = require('../models/SalaryDisbursement');
const Payslip = require('../models/Payslip');

// Mark Salary as Disbursed
router.post('/disburse/:payslipId', async (req, res) => {
  try {
    const payslip = await Payslip.findById(req.params.payslipId);
    if (!payslip) return res.status(404).json({ message: 'Payslip not found' });

    const disbursement = new SalaryDisbursement({
      employeeId: payslip.employeeId,
      payslipId: payslip._id,
      disbursementStatus: 'Disbursed',
      dateDisbursed: new Date(),
    });

    await disbursement.save();
    res.status(201).json({ message: 'Salary disbursed successfully', disbursement });
  } catch (error) {
    res.status(500).json({ message: 'Error marking salary as disbursed', error });
  }
});

// Get Salary Disbursement Status
router.get('/:employeeId', async (req, res) => {
  try {
    const disbursements = await SalaryDisbursement.find({ employeeId: req.params.employeeId });
    res.status(200).json({ disbursements });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching salary disbursements', error });
  }
});

module.exports = router;
