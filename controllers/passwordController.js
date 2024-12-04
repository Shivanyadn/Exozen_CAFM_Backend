const crypto = require('crypto');
const bcrypt = require('bcryptjs'); // Add bcrypt import
const nodemailer = require('nodemailer');
const User = require('../models/User');

const requestReset = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetTokenExpire = Date.now() + 15 * 60 * 1000;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'support@exozen.in', // Replace with your email
        pass: 'teth ifvb kyuf ntdi',  // Replace with your email password or app password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset Request',
      text: `Use this token to reset your password: ${resetToken}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Reset token sent to email' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    // Hash the token to compare with the one in the DB
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    // Find user with matching token and valid expiration date
    const user = await User.findOne({ resetToken: hashedToken, resetTokenExpire: { $gt: Date.now() } });
    if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

    // Hash the new password and save it
    user.password = await bcrypt.hash(newPassword, 10);

    // Clear the reset token and expiration
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;

    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });

  } catch (error) {
    console.error('Error in password reset:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { requestReset, resetPassword };
