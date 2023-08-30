const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Task title is required']
  },
  description: {
    type: String,
    required: [true, 'Task description is required']
  },
  deadline: {
    type: Date,
    required: [true, 'Task deadline is required']
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
    required: [true, 'Task priority is required']
  },
  status: {
    type: String,
    enum: ['todo', 'inProgress', 'completed'],
    default: 'todo',
    required: [true, 'Task status is required']
  },
  assignedTo: {
    type: String,
    required: [true, 'Must be assigned to an employee']
  },
});

taskSchema.pre('save', function (next) {
  console.log('Saving the task:', this.title);
  next();
});

taskSchema.post('save', function (doc, next) {
  console.log('Task saved successfully:', doc.title);
  next();
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
