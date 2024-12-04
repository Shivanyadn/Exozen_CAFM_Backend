const express = require('express');
const router = express.Router();
const Invoice = require('../models/invoice');
const Customer = require('../models/customer');
const pdfGenerator = require('../utils/pdfGenerator'); // Assuming pdfGenerator is your PDF utility

// Create and send an invoice
router.post('/invoices', async (req, res) => {
  try {
    const { customerId, items, totalAmount, dueDate } = req.body;

    const newInvoice = new Invoice({
      customerId,
      items,
      totalAmount,
      dueDate
    });

    await newInvoice.save();

    res.status(201).json({ message: 'Invoice created successfully', invoice: newInvoice });
  } catch (error) {
    console.error("Error details:", error); // Log the error for debugging
    res.status(500).json({ message: 'Error creating invoice', error: error.message });
  }
});

// Get a list of all invoices
router.get('/invoices', async (req, res) => {
  try {
    const invoices = await Invoice.find().select('_id');  // Only select the _id field
    res.status(200).json({ message: 'Invoices fetched successfully', invoices });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching invoices', error });
  }
});


// Get a specific invoice by its ID
router.get('/invoices/:invoiceId', async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.invoiceId).populate('customerId');
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    res.status(200).json({ message: 'Invoice fetched successfully', invoice });
  } catch (error) {
    console.error("Error fetching invoice:", error);
    res.status(500).json({ message: 'Error fetching invoice', error: error.message });
  }
});


router.post('/invoices/:invoiceId/pdf', async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.invoiceId);
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    // Generate PDF from utility function (get buffer instead of file path)
    const pdfBuffer = await pdfGenerator.generateInvoicePdf(invoice);

    // Set headers for the PDF response
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename=invoice.pdf'); // or 'attachment' to force download

    // Send the PDF buffer as the response
    res.status(200).send(pdfBuffer);
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ message: 'Error generating invoice PDF', error: error.message });
  }
});


// Update invoice status (e.g., Paid or Pending)
router.patch('/invoices/:invoiceId/status', async (req, res) => {
  try {
    const { status } = req.body;
    const invoice = await Invoice.findByIdAndUpdate(
      req.params.invoiceId,
      { status },
      { new: true }
    );

    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    res.status(200).json({ message: 'Invoice status updated successfully', invoice });
  } catch (error) {
    res.status(500).json({ message: 'Error updating invoice status', error });
  }
});

// Get invoices by status
router.get('/invoices/status/:status', async (req, res) => {
  try {
    const { status } = req.params;
    const invoices = await Invoice.find({ status }).populate('customerId');
    res.status(200).json({ message: `Invoices with ${status} status fetched successfully`, invoices });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching invoices by status', error });
  }
});

module.exports = router;
