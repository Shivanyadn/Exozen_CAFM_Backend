const mongoose = require('mongoose');

const salaryDisbursementSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  payslipId: { type: mongoose.Schema.Types.ObjectId, ref: 'Payslip', required: true },
  disbursementStatus: { type: String, enum: ['Pending', 'Disbursed'], default: 'Pending' },
  dateDisbursed: { type: Date, default: null },
});

const SalaryDisbursement = mongoose.model('SalaryDisbursement', salaryDisbursementSchema);

module.exports = SalaryDisbursement;
