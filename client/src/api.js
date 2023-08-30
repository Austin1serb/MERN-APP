import axios from 'axios';

const apiUrl = 'http://localhost:8000/api';



// User registration
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${apiUrl}/users/register`, userData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('Failed to register user');
    }
  }
};


// User login
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${apiUrl}/users/login`, userData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to log in user');
  }
};


// Get a user by their ID
export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${apiUrl}/users/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch user by ID');
  }
};



// Get all tasks
export const getTasks = async () => {
  try {
    const response = await axios.get(`${apiUrl}/tasks`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch tasks');
  }
};

// Create a new task
export const createTask = async (taskData) => {
  try {
    const response = await axios.post(`${apiUrl}`, taskData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create a new task');
  }
};

// Update a task
export const updateTask = async (taskId, taskData) => {
  try {
    const response = await axios.put(`${apiUrl}/tasks/${taskId}`, taskData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update the task');
  }
};

// Delete a task
export const deleteTask = async (taskId) => {
  try {
    const response = await axios.delete(`${apiUrl}/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete the task');
  }
};
// Fetch details of a single task
export const getTaskDetails = async (taskId, token) => {
  try {
    const response = await axios.get(`${apiUrl}/tasks/${taskId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('Failed to fetch task details');
    }
  }
};
