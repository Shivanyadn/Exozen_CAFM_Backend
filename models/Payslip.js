const mongoose = require('mongoose');

const payslipSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  salaryStructureId: { type: mongoose.Schema.Types.ObjectId, ref: 'SalaryStructure', required: true },
  earnings: { type: Number, required: true },
  deductions: { type: Number, required: true },
  netSalary: { type: Number, required: true },
  month: { type: String, required: true },
  year: { type: Number, required: true },
  dateIssued: { type: Date, default: Date.now },
});

const Payslip = mongoose.model('Payslip', payslipSchema);

module.exports = Payslip;
