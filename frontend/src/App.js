//frontend\src\App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import EmployeeList from './screens/EmployeeList';
import CreateEmployee from './screens/CreateEmployee';
import EditEmployee from './screens/EditEmployee';
function App() {
    return (
        <Routes>
        <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
            <Route path="/employee-list" element={<PrivateRoute component={EmployeeList} />} />
            <Route path="/edit-employee/:id" element={<PrivateRoute component={EditEmployee} />} />
            <Route path="/create-employee" element={<PrivateRoute component={CreateEmployee} />} />
        </Routes>
    );
}

export default App;
