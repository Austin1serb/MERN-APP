import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const TaskForm = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const initialTask = useMemo(() => location.state?.initialTask || {}, [location.state?.initialTask]);
  console.log(location.state)
  const formatDateForInput = (dateStr) => {
    const date = new Date(dateStr);
    let month = '' + (date.getMonth() + 1),
        day = '' + date.getDate(),
        year = date.getFullYear();
  
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
  
    return [year, month, day].join('-');
  };

  const [title, setTitle] = useState(initialTask.title || '');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [users, setUsers] = useState([]);
  const [errorMessages, setErrorMessages] = useState({
    title: '',
    description: '',
    deadline: '',
    priority: '',
    status: '',
    assignedTo: '',
  });

  useEffect(() => {
    
    setTitle(initialTask.title || '');
    setDescription(initialTask.description || '');
    setDeadline(formatDateForInput(initialTask.deadline || ''));
    setPriority(initialTask.priority || '');
    setStatus(initialTask.status || '');
    setAssignedTo(initialTask.assignedTo || '');
    fetchUsers();
  }, [initialTask]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/tasks', {
        title,
        description,
        deadline,
        priority,
        status,
        assignedTo,
      });
      console.log('Task created successfully:', response.data);

      setTitle('');
      setDescription('');
      setDeadline('');
      setPriority('');
      setStatus('');
      setAssignedTo('');
      setErrorMessages({
        title: '',
        description: '',
        deadline: '',
        priority: '',
        status: '',
        assignedTo: '',
      });

      // Navigate the user back to the TaskList page after successful task creation
      navigate('/dashboard');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        console.error('Error creating task:', error.response.data.message);
        console.log(error.response.data.errors);
        setErrorMessages(error.response.data.errors);

      } else {
        console.error('An error occurred while creating the task:', error);
      }
    }
  };

  return (
    <div className='container' >
      <button className="btn btn-primary" >
      <Link to="/" className="navbar-brand">Back to home</Link>
      </button>
      <h2>Modify or Create a  Task</h2>

      <form onSubmit={handleSubmit}>

        <div className="mb-3">

          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errorMessages && errorMessages.title && <div className="text-danger">{errorMessages.title.message}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            id="description"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errorMessages && errorMessages.description && <div className="text-danger">{errorMessages.description.message}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="deadline" className="form-label">Deadline</label>
          <input
            type="date"
            id="deadline"
            className="form-control"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
          {errorMessages && errorMessages.deadline && <div className="text-danger">{errorMessages.deadline.message}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="priority" className="form-label">Priority</label>
          <select
            id="priority"
            className="form-control"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="" disabled>Select priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          {errorMessages && errorMessages.priority && <div className="text-danger">{errorMessages.priority.message}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="status" className="form-label">Status</label>
          <select
            id="status"
            className="form-control"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="" disabled>Select status</option>
            <option value="todo">To-Do</option>
            <option value="inProgress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          {errorMessages && errorMessages.status && <div className="text-danger">{errorMessages.status.message}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="assignedTo" className="form-label">Assigned To</label>
          <select
            id="assignedTo"
            className="form-control"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
          >
            <option value="" disabled>Select an assigned user</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>{user.name}</option>
            ))}
          </select>
          {errorMessages && errorMessages.assignedTo && <div className="text-danger">{errorMessages.assignedTo.message}</div>}
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default TaskForm;
