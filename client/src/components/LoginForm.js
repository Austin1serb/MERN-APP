import React, { useState, useEffect } from 'react';
import { loginUser } from '../api';
import { useNavigate } from 'react-router-dom';
import "../App.module.css"

const LoginForm = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };
  useEffect(() => {
    const registrationSuccessMessage = localStorage.getItem('registrationSuccessMessage');
    if (registrationSuccessMessage) {
      setSuccess(registrationSuccessMessage);
      localStorage.removeItem('registrationSuccessMessage');
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      onLogin(response.token);
      setError('');
      navigate('/dashboard');
    } catch (error) {
      setError('Invalid credentials. Please check your email and password.');
    }
  };
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title text-center">Login</h2>
          {error && <p className="alert alert-danger">{error}</p>}
          {success && <p className="alert alert-success">{success}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
