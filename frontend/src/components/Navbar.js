// frontend/src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo_B2R.png'; // Adjust the path if needed

const Navbar = () => {
    const [adminUsername, setAdminUsername] = useState('');

    useEffect(() => {
        // Retrieve admin username from localStorage
        const storedUsername = localStorage.getItem('adminUsername');
        if (storedUsername) {
            setAdminUsername(storedUsername);
        }
    }, []); // Run only once when the component mounts

    const handleLogout = () => {
        // Clear localStorage and redirect
        localStorage.removeItem('adminUsername');
        localStorage.removeItem('token'); // Ensure token is also removed
        window.location.href = '/'; // Redirect to login page or home
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
            <Link className="navbar-brand" to="/dashboard">
                <img src={logo} alt="Logo" style={{ maxWidth: '100px' }} />
            </Link>
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
                    Admin: {adminUsername || 'Guest'}
                </span>
                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    );
};

export default Navbar;
