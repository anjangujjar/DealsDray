const Employee = require('../models/Employee');
const path = require('path');
const fs = require('fs');

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employees' });
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employee' });
  }
};

exports.createEmployee = async (req, res) => {
  try {
    const { f_Id, f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course, f_Createdate } = req.body;
    const f_Image = req.file ? req.file.filename : '';

    const newEmployee = new Employee({
      f_Id,
      f_Name,
      f_Email,
      f_Mobile,
      f_Designation,
      f_gender,
      f_Course,
      f_Createdate,
      f_Image
    });

    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500).json({ message: 'Error creating employee' });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const { f_Id, f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course, f_Createdate } = req.body;
    const f_Image = req.file ? req.file.filename : '';

    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      { f_Id, f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course, f_Createdate, f_Image },
      { new: true }
    );

    if (!updatedEmployee) return res.status(404).json({ message: 'Employee not found' });
    res.json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ message: 'Error updating employee' });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) return res.status(404).json({ message: 'Employee not found' });
    res.json({ message: 'Employee deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting employee' });
  }
};
