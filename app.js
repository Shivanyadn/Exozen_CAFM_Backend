require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const salaryStructureRoutes = require('./routes/salaryStructure');
const payslipRoutes = require('./routes/payslip');
const salaryDisbursementRoutes = require('./routes/salaryDisbursement');
const invoiceRoutes = require('./routes/invoice');
const kycRoutes = require('./routes/kycRoutes');
const uniformRequestRoutes = require('./routes/uniformRequest');
const inventoryRoutes = require('./routes/inventory');
const idCardRoutes = require('./routes/idCardRoutes');


const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
// Attendance Routes
app.use('/api/attendance', attendanceRoutes);
// Salary Structure Routes
app.use('/api', salaryStructureRoutes); 
// Payslip Routes
app.use('/api/payslip', payslipRoutes);
// Salary Disbursement Routes
app.use('/api/salary-disbursement', salaryDisbursementRoutes);
// Invoice Routes
app.use('/api', invoiceRoutes);
// KYC Routes
app.use('/api/kyc', kycRoutes);
// Uniform Request Routes
app.use('/api/uniforms', uniformRequestRoutes);
// Inventory Routes
app.use('/api/inventory', inventoryRoutes);
// Use ID card routes
app.use('/api/id-cards', idCardRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
