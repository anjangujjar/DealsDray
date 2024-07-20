import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const isAuthenticated = localStorage.getItem('token'); // Simplified check

    return (
        isAuthenticated ? (
            <Component {...rest} />
        ) : (
            <Navigate to="/login" />
        )
    );
};

export default PrivateRoute;