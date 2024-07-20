import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'f_Name', direction: 'asc' });
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/employees');
                setEmployees(response.data);
                setFilteredEmployees(response.data);
            } catch (error) {
                setError('Error fetching employee data');
                console.error('Error fetching employees:', error);
            }
        };

        fetchEmployees();
    }, []);

    useEffect(() => {
        let filtered = employees;

        if (searchTerm) {
            filtered = filtered.filter(employee =>
                employee.f_Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                employee.f_Mobile.includes(searchTerm)
            );
        }

        if (sortConfig) {
            filtered.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }

        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);

        setFilteredEmployees(currentItems);
    }, [searchTerm, sortConfig, currentPage, employees]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/employees/${id}`);
            const updatedEmployees = employees.filter(employee => employee._id !== id);
            setEmployees(updatedEmployees);
            setFilteredEmployees(updatedEmployees);
        } catch (error) {
            setError('Error deleting employee');
            console.error('Error deleting employee:', error);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSortChange = (e) => {
        const [key, direction] = e.target.value.split(',');
        setSortConfig({ key, direction });
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleStatusChange = async (id, currentStatus) => {
        try {
            await axios.patch(`http://localhost:5000/api/employees/${id}`, { active: !currentStatus });
            const updatedEmployees = employees.map(employee =>
                employee._id === id ? { ...employee, active: !currentStatus } : employee
            );
            setEmployees(updatedEmployees);
            setFilteredEmployees(updatedEmployees);
        } catch (error) {
            setError('Error updating employee status');
            console.error('Error updating employee status:', error);
        }
    };

    const totalPages = Math.ceil(employees.length / itemsPerPage);

    return (
        <div className="container mt-5">
            <Navbar />

            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Employee List</h2>
                <span className="badge bg-secondary">Total Count: {employees.length}</span>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by Name or Mobile No."
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>

            <div className="mb-3 d-flex justify-content-between">
                <Link to="/create-employee" className="btn btn-primary">Create New Employee</Link>
                <div>
                    <select className="form-select" onChange={handleSortChange}>
                        <option value="f_Name,asc">Sort by Name (A-Z)</option>
                        <option value="f_Name,desc">Sort by Name (Z-A)</option>
                        <option value="f_Email,asc">Sort by Email (A-Z)</option>
                        <option value="f_Email,desc">Sort by Email (Z-A)</option>
                        <option value="f_Id,asc">Sort by ID (Asc)</option>
                        <option value="f_Id,desc">Sort by ID (Desc)</option>
                        <option value="f_Createdate,asc">Sort by Created Date (Oldest)</option>
                        <option value="f_Createdate,desc">Sort by Created Date (Newest)</option>
                    </select>
                </div>
            </div>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Unique ID</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Mobile No.</th>
                        <th>Designation</th>
                        <th>Gender</th>
                        <th>Course</th>
                        <th>Created Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEmployees.map(employee => (
                        <tr key={employee._id}>
                            <td>{employee.f_Id}</td>
                            <td>
                                <img
                                    src={employee.f_Image ? `http://localhost:5000/${employee.f_Image}` : 'path/to/placeholder-image.png'}
                                    alt="Employee"
                                    style={{
                                        width: '50px',
                                        height: '50px',
                                        objectFit: 'cover',
                                        borderRadius: '5px',
                                        border: '1px solid #ddd'
                                    }}
                                />
                            </td>
                            <td>{employee.f_Name}</td>
                            <td>{employee.f_Mobile}</td>
                            <td>{employee.f_Designation}</td>
                            <td>{employee.f_gender}</td>
                            <td>{employee.f_Course.join(', ')}</td>
                            <td>{new Date(employee.f_Createdate).toLocaleDateString()}</td>
                            <td>
                                <button
                                    className={`btn btn-sm ${employee.active ? 'btn-success' : 'btn-danger'}`}
                                    onClick={() => handleStatusChange(employee._id, employee.active)}
                                >
                                    {employee.active ? 'Active' : 'Inactive'}
                                </button>
                            </td>
                            <td>
                                <Link to={`/edit-employee/${employee._id}`} className="btn btn-warning btn-sm me-2">Edit</Link>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(employee._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <nav aria-label="Page navigation">
                <ul className="pagination">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                                {index + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default EmployeeList;
