import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserTaskList = () => {
  const [users, setUsers] = useState([]); // State to store users
  const [tasks, setTasks] = useState([]); // State to store tasks

  useEffect(() => {
    // Fetch users and tasks data when the component mounts
    fetchUsers();
    fetchTasks();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/users');
      setUsers(response.data); // Assuming the response contains the list of users
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/tasks');
      setTasks(response.data); // Assuming the response contains the list of tasks
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Organize tasks by user ID
  const tasksByUser = tasks.reduce((acc, task) => {
    if (!acc[task.assignedTo]) {
      acc[task.assignedTo] = [task];
    } else {
      acc[task.assignedTo].push(task);
    }
    return acc;
  }, {});

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8000/api/users/${userId}`);
      // After successful deletion, update the users list
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {/* Heading Style Update */}
          <h2 className="mb-4 text-center" style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
            User Task List
          </h2>
          {users.length === 0 ? (
            <div className="alert alert-info">No users found</div>
          ) : (
            <div>
              {users.map((user) => (
                <div key={user._id} className="card mb-4 shadow-sm">
                  {/* Card Header Style Update */}
                  <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                    <span style={{ fontSize: '1.5rem' }}>{user.name}</span>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteUser(user._id)}
                    >
                      Delete User
                    </button>
                  </div>
                  <ul className="list-group list-group-flush">
                    {tasksByUser[user._id] ? (
                      tasksByUser[user._id].map((task) => (
                        <li key={task._id} className="list-group-item d-flex justify-content-between align-items-center">
                          {/* Task Title Style Update */}
                          <span style={{ fontSize: '1.2rem' }}>{task.title}</span>
                          <Link to="/dashboard" className="btn btn-primary">
                            View
                          </Link>
                        </li>
                      ))
                    ) : (
                      <li className="list-group-item">No tasks assigned</li>
                    )}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
  
  
};

export default UserTaskList;
