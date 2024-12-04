const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const register = async (req, res) => {
  const { name, email, password, role, projects } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      projects,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Respond with success, including user details
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        name: savedUser.name,
        email: savedUser.email,
        role: savedUser.role,
        projects: savedUser.projects,
      },
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};


// Login controller
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT payload
    const payload = {
      userId: user._id,
      role: user.role, // Include the role in the JWT payload
    };

    // Sign the JWT token
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send token and role back to the client
    res.status(200).json({
      token,
      role: user.role,  // Include the user's role in the response
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
module.exports = { register, login };
