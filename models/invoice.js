const mongoose = require('mongoose');
const Customer = require('./customer'); 

const invoiceSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  items: [{
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  }],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['Paid', 'Pending'], default: 'Pending' },
  issueDate: { type: Date, default: Date.now },
  dueDate: { type: Date, required: true },
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
