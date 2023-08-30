import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import Dashboard from './components/Dashboard';
import TaskForm from './components/TaskForm';
import UserTaskList from './components/UserTaskList';
import TaskDetails from './components/TaskDetails';
import './App.module.css'
const App = () => {
  const [userToken, setUserToken] = useState('');
  const location = useLocation();

  useEffect(() => {
    // Check if the user token exists in local storage when the app starts
    const tokenFromStorage = localStorage.getItem('userToken');
    if (tokenFromStorage) {
      setUserToken(tokenFromStorage);
    }
  }, []);

  const handleLogin = (token) => {
    // Store the user token in local storage
    localStorage.setItem('userToken', token);
    setUserToken(token);
  };

  const handleLogout = () => {
    // Remove the user token from local storage
    localStorage.removeItem('userToken');
    setUserToken('');
  };

  return (
    <div className='main' >
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary border-bottom">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">Task Manager</Link>
          <ul className="navbar-nav ms-auto">
            {userToken ? (
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={handleLogout}>Logout</button>
              </li>
            ) : (
              <>
                {location.pathname === '/register' ? (
                  <li className="nav-item">
                    <Link to="/" className="nav-link">Already have an account?</Link>
                  </li>
                ) : (
                  <li className="nav-item">
                    <Link to="/register" className="nav-link">Don't have an Account?</Link>
                  </li>
                )}
              </>
            )}
          </ul>
        </div>
      </nav>

      <div className="py-4">
        <Routes>
          <Route
            path="/"
            element={
              userToken ? <Navigate to="/dashboard" /> : <LoginForm onLogin={handleLogin} />
            }
          />
          <Route path="/user-task-list" element={<UserTaskList />} />
          <Route path="/" element={<LoginForm onLogin={handleLogin} />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route
            path="/dashboard"
            element={userToken ? <Dashboard /> : <Navigate to="/" />}
          />
          <Route path='/dashboard/tasks/taskform' element={<TaskForm />} />
          <Route path='/dashboard/tasks/:taskId' element={<TaskForm />} />
          <Route path='/login' element={<LoginForm onLogin={handleLogin} />} />
          <Route path="/task-details/:taskId" element={<TaskDetails />} />
        </Routes>
      </div>
    </div>

  );
};

export default App;
