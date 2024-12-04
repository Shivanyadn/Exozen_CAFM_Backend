const express = require('express');
const { register, login } = require('../controllers/authController');
const { requestReset, resetPassword } = require('../controllers/passwordController');
const roleAccess = require('../middlewares/roleAccess');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/request-reset', requestReset);
router.post('/reset-password', resetPassword);

//router.get('/admin-only', roleAccess('Admin'), (req, res) => res.json({ message: 'Welcome, Admin' }));

module.exports = router;
