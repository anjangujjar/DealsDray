// backend/routes/auth.js

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new user
router.post('/register', async (req, res) => {
  const { username, password, isAdmin } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    user = new User({
      username,
      password,
      isAdmin: isAdmin || false // Default to false if not provided
    });

    // Hash password before saving
    user.password = await bcrypt.hash(password, 10);

    // Save user to the database
    await user.save();

    // Create JWT token
    const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token, adminUsername: user.username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send token and username in response
    res.json({ token, adminUsername: user.username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
