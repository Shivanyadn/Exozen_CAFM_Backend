const { createCanvas, loadImage } = require('canvas');
const { bucket } = require('../firebase'); // Firebase config
const IDCard = require('../models/IDCard'); // Mongoose model

const generateIdCard = async (employee) => {
  // Use employee._id directly (no need to create a new ObjectId)
  const employeeId = employee._id;

  // Create canvas for ID card
  const canvas = createCanvas(400, 250);
  const ctx = canvas.getContext('2d');

  // Set background color and draw card
  ctx.fillStyle = '#f0f0f0'; // Background color
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Add employee details to canvas
  ctx.fillStyle = '#000000'; // Text color
  ctx.font = '20px Arial';
  ctx.fillText(`Employee Name: ${employee.firstName} ${employee.lastName}`, 20, 40);
  ctx.fillText(`Employee ID: ${employee.employeeId}`, 20, 80);
  ctx.fillText(`Department: ${employee.department}`, 20, 120);

  // Optionally, add a photo (if available)
  if (employee.photoUrl) {
    const photo = await loadImage(employee.photoUrl);
    ctx.drawImage(photo, 20, 150, 50, 50); // Adjust photo size and position
  }

  // Upload to Firebase Storage
  const file = bucket.file(`id_cards/${employee.employeeId}_id_card.png`);
  const stream = file.createWriteStream({
    metadata: {
      contentType: 'image/png',
    },
  });

  // Convert canvas to stream and upload
  const buffer = canvas.toBuffer('image/png');
  stream.end(buffer);

  // Store ID Card info in MongoDB
  const idCard = new IDCard({
    employeeId, // Use employee._id directly
    cardUrl: `https://storage.googleapis.com/${bucket.name}/id_cards/${employee.employeeId}_id_card.png`,
  });

  await idCard.save();

  return idCard; // Return the saved ID Card
};

module.exports = { generateIdCard };
