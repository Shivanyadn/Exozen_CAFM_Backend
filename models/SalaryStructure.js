const mongoose = require('mongoose');

const salaryStructureSchema = new mongoose.Schema({
  role: { type: String, required: true },
  baseSalary: { type: Number, required: true },
  allowances: { type: Number, default: 0 },
  bonuses: { type: Number, default: 0 },
  deductions: { type: Number, default: 0 },
  tax: { type: Number, default: 0 },
  otherBenefits: { type: Number, default: 0 },
});

const SalaryStructure = mongoose.model('SalaryStructure', salaryStructureSchema);

module.exports = SalaryStructure;
