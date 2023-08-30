const express = require('express');
const router = express.Router();
const Task = require('../models/task');

// Route to get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to create a new task
router.post('/', async (req, res) => {
  const { title, description, deadline, priority, status, assignedTo } = req.body;


  try {
    const task = new Task({
      title,
      description,
      deadline,
      priority,
      status,
      assignedTo,
    });

    console.log('Attempting to save the new task...');
    const newTask = await task.save();
    console.log('New task saved successfully:', newTask);

    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creating task:', error.message);
    res.status(400).json(error);
  }
});


// Route to update a task
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (req.body.status) {
      task.status = req.body.status;
    }

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json(error);
  }
});
// Route to get one task by id
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Route to delete a task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.deleteOne();
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
