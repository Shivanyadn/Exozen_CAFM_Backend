const PDFDocument = require('pdfkit');

const generateInvoicePdf = (invoice) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const chunks = [];

    // Collect PDF output as chunks
    doc.on('data', (chunk) => {
      chunks.push(chunk);
    });

    doc.on('end', () => {
      const pdfBuffer = Buffer.concat(chunks); // Combine all chunks to form the complete PDF
      resolve(pdfBuffer);
    });

    doc.fontSize(18).text('Invoice', { align: 'center' });
    doc.moveDown();

    doc.fontSize(12).text(`Invoice ID: ${invoice._id}`);
    doc.text(`Customer ID: ${invoice.customerId}`);
    doc.text(`Issue Date: ${invoice.issueDate}`);
    doc.text(`Due Date: ${invoice.dueDate}`);
    doc.text(`Status: ${invoice.status}`);

    doc.moveDown();

    doc.text('Items:', { underline: true });
    invoice.items.forEach((item) => {
      doc.text(`- ${item.description}: $${item.price} x ${item.quantity}`);
    });

    doc.moveDown();
    doc.text(`Total Amount: $${invoice.totalAmount}`);

    doc.end();
  });
};

module.exports = { generateInvoicePdf };
