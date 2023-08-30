const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken'); // Add jsonwebtoken library
const tasksRouter = require('./routes/tasks');
const usersRouter = require('./routes/users'); // Import the new users route

const app = express();
const port = 8000; // Use port 8000 as per your preference

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection (you should replace 'your-mongodb-uri' with your actual MongoDB connection URI)
mongoose
  .connect('mongodb+srv://serbaustin:asd123@cluster0.miragf2.mongodb.net/task-management?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Use the tasks and users routes
app.use('/api/tasks', tasksRouter);
app.use('/api/users', usersRouter); // Use the /api/users prefix for user routes

// Start the server
app.listen(port, () => console.log(`Server running on port ${port}`));
