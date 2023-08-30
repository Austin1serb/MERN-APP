import React, { useState, useEffect } from 'react';
import { getTasks } from '../api';
import TaskItem from './TaskItem'; 


const TaskList = ({ token }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const tasksData = await getTasks(token);
      setTasks(tasksData);
    } catch (error) {
      console.error('Error fetching tasks:', error.message);
    }
  };

  return (
    <div>
      <h3>All Tasks</h3>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Task</th>
            <th scope="col">End Date</th>
            <th scope="col">Status</th>
            <th scope="col">Priority</th>
            <th scope="col">Assigned To</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <TaskItem key={task._id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
