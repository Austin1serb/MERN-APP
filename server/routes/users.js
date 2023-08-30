const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Route for user registration
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Create a new user with hashed password
    const newUser = new User({ name, email, password });
    await newUser.save();

    // Send a success response
    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    // Here you can catch validation errors and send a custom message
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      res.status(400).json({ message: `Registration failed: ${messages.join(' ')}` });
    } else {
      res.status(500).json({ message: 'An unexpected error occurred' });
    }
  }
});

// Route for user login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token for authentication
    const token = jwt.sign({ userId: user._id }, 'asdf1234', { expiresIn: '1h' });

    // Send the token in the response
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Login failed' });
  }
});

// Route for fetching all users
router.get('/', async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find({}, '-password'); // Excluding the 'password' field from the response

    // Send the list of users in the response
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

// GET route to get a user by ID
router.get('/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    // Find the user in the database by their ID
    const user = await User.findById(userId);

    if (!user) {
      // If the user is not found, return a 404 Not Found response
      return res.status(404).json({ message: 'User not found' });
    }

    // If the user is found, return the user data in the response
    res.json(user);
  } catch (error) {
    // If there's an error during the database query, return a 500 Internal Server Error response
    res.status(500).json({ message: 'Failed to fetch user by ID' });
  }
});

// Route to delete a user by ID
router.delete('/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    // Find the user in the database by their ID
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      // If the user is not found, return a 404 Not Found response
      return res.status(404).json({ message: 'User not found' });
    }

    // If the user is found, return the user data in the response
    res.json(user);
  } catch (error) {
    // If there's an error during the database query, return a 500 Internal Server Error response
    res.status(500).json({ message: 'Failed to delete user by ID' });
  }
});

module.exports = router;
