// frontend/src/screens/EditEmployee.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';

const EditEmployee = () => {
    const { id } = useParams();
    const [form, setForm] = useState({
        f_Id: '',
        f_Name: '',
        f_Email: '',
        f_Mobile: '',
        f_Designation: '',
        f_gender: '',
        f_Course: [],
        f_Createdate: '',
        f_Image: ''
    });
    const [errors, setErrors] = useState({});
    const [file, setFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/employees/${id}`);
                setForm(response.data);
                if (response.data.f_Image) {
                    setImagePreview(`http://localhost:5000/${response.data.f_Image}`);
                }
            } catch (error) {
                console.error('Error fetching employee:', error.response ? error.response.data : error.message);
                alert('Failed to load employee data');
            }
        };

        fetchEmployee();
    }, [id]);

    const validateForm = () => {
        const newErrors = {};
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const mobilePattern = /^[0-9]{10}$/;

        if (!form.f_Id) newErrors.f_Id = 'ID is required';
        if (!form.f_Name) newErrors.f_Name = 'Name is required';
        if (!form.f_Email) {
            newErrors.f_Email = 'Email is required';
        } else if (!emailPattern.test(form.f_Email)) {
            newErrors.f_Email = 'Invalid email format';
        }
        if (!form.f_Mobile) {
            newErrors.f_Mobile = 'Mobile No is required';
        } else if (!mobilePattern.test(form.f_Mobile)) {
            newErrors.f_Mobile = 'Mobile No must be a 10-digit number';
        }
        if (!form.f_Designation) newErrors.f_Designation = 'Designation is required';
        if (!form.f_gender) newErrors.f_gender = 'Gender is required';
        if (form.f_Course.length === 0) newErrors.f_Course = 'At least one course must be selected';
        if (file && !['image/jpeg', 'image/png'].includes(file.type)) {
            newErrors.f_Image = 'Only jpg/png files are allowed';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setForm(prevForm => ({
                ...prevForm,
                f_Course: checked ? [...prevForm.f_Course, value] : prevForm.f_Course.filter(item => item !== value)
            }));
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const formData = new FormData();
        Object.keys(form).forEach(key => {
            if (Array.isArray(form[key])) {
                form[key].forEach(value => formData.append(key, value));
            } else {
                formData.append(key, form[key]);
            }
        });

        if (file) formData.append('f_Image', file);

        try {
            await axios.put(`http://localhost:5000/api/employees/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Employee updated successfully!');
            navigate('/employee-list'); // Redirect to employee list
        } catch (error) {
            console.error('Error updating employee:', error.response ? error.response.data : error.message);
            alert('Error updating employee. Please try again.');
        }
    };

    return (
        <div className="container mt-4">
            <Navbar />
            <h2>Edit Employee</h2>
            <form onSubmit={handleSubmit}>
                {/* Form Fields */}
                <div className="mb-3">
                    <label htmlFor="f_Id" className="form-label">ID</label>
                    <input
                        type="text"
                        className="form-control"
                        id="f_Id"
                        name="f_Id"
                        value={form.f_Id}
                        onChange={handleChange}
                        disabled
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="f_Name" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="f_Name"
                        name="f_Name"
                        value={form.f_Name}
                        onChange={handleChange}
                    />
                    {errors.f_Name && <div className="text-danger">{errors.f_Name}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="f_Email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="f_Email"
                        name="f_Email"
                        value={form.f_Email}
                        onChange={handleChange}
                    />
                    {errors.f_Email && <div className="text-danger">{errors.f_Email}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="f_Mobile" className="form-label">Mobile No</label>
                    <input
                        type="text"
                        className="form-control"
                        id="f_Mobile"
                        name="f_Mobile"
                        value={form.f_Mobile}
                        onChange={handleChange}
                    />
                    {errors.f_Mobile && <div className="text-danger">{errors.f_Mobile}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="f_Designation" className="form-label">Designation</label>
                    <select
                        className="form-select"
                        id="f_Designation"
                        name="f_Designation"
                        value={form.f_Designation}
                        onChange={handleChange}
                    >
                        <option value="">Select Designation</option>
                        <option value="HR">HR</option>
                        <option value="Manager">Manager</option>
                        <option value="Sales">Sales</option>
                    </select>
                    {errors.f_Designation && <div className="text-danger">{errors.f_Designation}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Gender</label>
                    <div className="form-check">
                        <input
                            type="radio"
                            className="form-check-input"
                            id="f_gender_m"
                            name="f_gender"
                            value="M"
                            checked={form.f_gender === 'M'}
                            onChange={handleChange}
                        />
                        <label htmlFor="f_gender_m" className="form-check-label">Male</label>
                    </div>
                    <div className="form-check">
                        <input
                            type="radio"
                            className="form-check-input"
                            id="f_gender_f"
                            name="f_gender"
                            value="F"
                            checked={form.f_gender === 'F'}
                            onChange={handleChange}
                        />
                        <label htmlFor="f_gender_f" className="form-check-label">Female</label>
                    </div>
                    {errors.f_gender && <div className="text-danger">{errors.f_gender}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Course</label>
                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="course_mca"
                            value="MCA"
                            checked={form.f_Course.includes('MCA')}
                            onChange={handleChange}
                        />
                        <label htmlFor="course_mca" className="form-check-label">MCA</label>
                    </div>
                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="course_bca"
                            value="BCA"
                            checked={form.f_Course.includes('BCA')}
                            onChange={handleChange}
                        />
                        <label htmlFor="course_bca" className="form-check-label">BCA</label>
                    </div>
                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="course_bsc"
                            value="BSC"
                            checked={form.f_Course.includes('BSC')}
                            onChange={handleChange}
                        />
                        <label htmlFor="course_bsc" className="form-check-label">BSC</label>
                    </div>
                    {errors.f_Course && <div className="text-danger">{errors.f_Course}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="f_Createdate" className="form-label">Created Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="f_Createdate"
                        name="f_Createdate"
                        value={form.f_Createdate ? new Date(form.f_Createdate).toISOString().split('T')[0] : ''}
                        onChange={handleChange}
                    />
                    {errors.f_Createdate && <div className="text-danger">{errors.f_Createdate}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="f_Image" className="form-label">Profile Image</label>
                    <input
                        type="file"
                        className="form-control"
                        id="f_Image"
                        onChange={handleFileChange}
                    />
                    {imagePreview && <img src={imagePreview} alt="Image Preview" className="img-thumbnail mt-3" />}
                    {errors.f_Image && <div className="text-danger">{errors.f_Image}</div>}
                </div>

                <button type="submit" className="btn btn-primary">Update Employee</button>
            </form>
        </div>
    );
};

export default EditEmployee;
