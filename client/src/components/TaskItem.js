import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateTask, deleteTask, getUserById } from '../api';
import "../App.module.css"

const TaskItem = ({ task }) => {
  const [updatedTask, setUpdatedTask] = useState(task);
  const [assignedUser, setAssignedUser] = useState();

  useEffect(() => {
    const fetchAssignedUser = async () => {
      try {
        // Make an API call to get the user data for the assigned user
        console.log('task.assignedTo', task.assignedTo)
        const user = await getUserById(updatedTask.assignedTo);
        setAssignedUser(user);
      } catch (error) {
        console.error('Error fetching assigned user:', error.message);
      }
    };
    fetchAssignedUser();
  }, []);


  const navigate = useNavigate();
  const handleStart = async (e) => {
    e.stopPropagation();
    try {
      // Make an API call to update the task status to 'In-progress'
      const updatedStatus = 'inProgress';
      await updateTask(task._id, { status: updatedStatus });
      setUpdatedTask({ ...updatedTask, status: updatedStatus });
    } catch (error) {
      console.error('Error starting task:', error.message);
    }
  };

  const handleComplete = async (e) => {
    e.stopPropagation();
    try {
      // Make an API call to update the task status to 'Completed'
      const updatedStatus = 'completed';
      await updateTask(task._id, { status: updatedStatus });
      setUpdatedTask({ ...updatedTask, status: updatedStatus });
    } catch (error) {
      console.error('Error completing task:', error.message);
    }
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      // Make an API call to delete the task
      await deleteTask(task._id);
      // Remove the task from the list without reloading the entire page
      setUpdatedTask(null);
    } catch (error) {
      console.error('Error deleting task:', error.message);
    }
  };
  if (!updatedTask || !assignedUser) {
    return null; // Render nothing if the task or assigned user data is not available
  }

  const dateObject = new Date(updatedTask.deadline);

  // Format the date
  const formattedDate = `${dateObject.toLocaleString('default', { month: 'long' })} ${dateObject.getDate()}, ${dateObject.getFullYear()}`;

  const handleTaskClick = () => {
    navigate(`/task-details/${task._id}`);
  };


  return (
    <tr onClick={handleTaskClick} style={{cursor: "pointer"}}  className="hoverable-task-row">
      <td className="rounded">
        <h4 className="card-title">{updatedTask.title}</h4>
      </td>
      <td>
        {formattedDate}
      </td>
      <td>
        {updatedTask.status}
      </td>
      <td>
        <div
          className="priorityCircle"
          style={{
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            display: 'inline-block',
            backgroundColor: updatedTask.priority === 'low' ? 'lightblue' :
              updatedTask.priority === 'medium' ? 'yellow' : 'red', marginLeft: "10px"
          }}
        >
        </div>
      </td>
      <td>
        {assignedUser.name}
      </td>
      <td>
        <div className="task-buttons d-flex flex-column align-items-start">
          <button name='start' className="btn btn-primary btn-sm mb-1 same-size-button" onClick={handleStart}>
            Start
          </button>
          <button name='complete' style={{ backgroundColor: '#4CD778' }} className="btn btn-success btn-sm mb-1 same-size-button" onClick={handleComplete}>
            Finish
          </button>
          <button name='delete' style={{ backgroundColor: '#FC5D37' }} className="btn btn-danger btn-sm mb-1 same-size-button" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </td>
    </tr>
  );


};

export default TaskItem;
