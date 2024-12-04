// db.js
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

// Function to connect to the database
const connectDB = () => {
  const mongoURI = process.env.MONGO_URI;
  mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
      console.error('MongoDB connection error:', err);
      process.exit(1); // Exit if the connection fails
    });
};

module.exports = connectDB;  // Export the function to use it in other files
