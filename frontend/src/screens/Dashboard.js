import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../components/logo_B2R.png'; // Adjust the path if needed

const Dashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem('adminUsername');
    window.location.href = '/';
  };

  return (
    <div className="container mt-4">
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <a className="navbar-brand" href="#">
          <img src={logo} alt="Logo" style={{ maxWidth: '100px' }} />
        </a>
        <a className="navbar-brand" href="#">Dashboard</a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/employee-list">Employee List</Link>
            </li>
          </ul>
          <span className="navbar-text mx-3">
            Admin: {localStorage.getItem('adminUsername')}
          </span>
          <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
        </div>
      </nav>
      <div className="text-center mb-4">
        <h2>Welcome to Admin Panel</h2>
      </div>
      {/* Other dashboard content here */}
    </div>
  );
};

export default Dashboard;
