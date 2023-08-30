import React from 'react';
import { Link } from 'react-router-dom';
import TaskList from './TaskList';






const Dashboard = () => {
  const dashboardStyle = {
    minHeight: '100vh',
    display: 'flex',
    color: 'black',
  };

  const containerStyle = {
    maxWidth: '800px',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    overflowX: 'auto'  // Enable horizontal scrolling
  };

  const headingStyle = {
    textAlign: 'center',
    marginBottom: '30px',
    fontFamily: 'Arial, sans-serif', // Use a clean and widely available font
    fontSize: '32px', // Increase the font size for a sophisticated look
  };

  const buttonStyle = {
    marginBottom: '10px',
    transition: 'transform 0.3s ease', // Add a transition to the transform property
  };

  const handleButtonHover = (e) => {
    e.target.style.transform = 'translateY(-10px)'; // Move the button up 5px on hover
  };

  const handleButtonLeave = (e) => {
    e.target.style.transform = 'translateY(0)'; // Reset the button position on hover leave
  };


  return (
    <div style={dashboardStyle}>
      <div className="container-fluid" style={containerStyle}>
        <div className="row">
          <div className="col-12">
            <h2 style={headingStyle}>Dashboard</h2>

            <div className="text-center mb-3">
              <div className="row">
                <div className="col">
                  <Link
                    to="/user-task-list"
                    className="btn btn-primary"
                    style={buttonStyle}
                    onMouseEnter={handleButtonHover}
                    onMouseLeave={handleButtonLeave}
                  >
                    View Task List
                  </Link>
                </div>
                <div className="col">
                  <Link
                    to="tasks/taskform"
                    className="btn btn-primary"
                    style={buttonStyle}
                    onMouseEnter={handleButtonHover}
                    onMouseLeave={handleButtonLeave}
                  >
                    Add a Task
                  </Link>
                </div>
              </div>
            </div>

            <TaskList />

          </div>
        </div>
      </div>
    </div>
  );

};

export default Dashboard;