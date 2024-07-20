// frontend/src/screens/Login.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../components/logo_B2R.png'; // Adjust the path if needed

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        alert('Use username: Anjan and password: root');
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
            const { token, adminUsername } = response.data;

            // Store token and username in localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('adminUsername', adminUsername);

            // Verify storage
            console.log('Stored token:', localStorage.getItem('token'));
            console.log('Stored adminUsername:', localStorage.getItem('adminUsername'));

            navigate('/dashboard');
        } catch (error) {
            console.error('Error during login:', error.response?.data || error.message);
            setError('Invalid login credentials');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="text-center mb-4">
                        <img src={logo} alt="Logo" className="img-fluid" style={{ maxWidth: '200px' }} />
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title text-center mb-4">Login</h3>
                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label className="form-label">Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                {error && <div className="alert alert-danger">{error}</div>}
                                <button type="submit" className="btn btn-primary w-100">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
