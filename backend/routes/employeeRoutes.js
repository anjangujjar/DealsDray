const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Employee = require('../models/Employee');

// Multer Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// Get all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employees', error });
  }
});

// Get employee by ID
router.get('/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employee', error });
  }
});

// Create new employee
router.post('/', upload.single('f_Image'), async (req, res) => {
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
    res.status(500).json({ message: 'Error creating employee', error });
  }
});

// Update employee
router.put('/:id', upload.single('f_Image'), async (req, res) => {
  try {
    const { f_Id, f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course, f_Createdate } = req.body;
    const existingEmployee = await Employee.findById(req.params.id);

    if (!existingEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    const f_Image = req.file ? req.file.filename : existingEmployee.f_Image; // Preserve old image if no new image is provided

    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      { f_Id, f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course, f_Createdate, f_Image },
      { new: true }
    );

    res.json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ message: 'Error updating employee', error });
  }
});

// Delete employee
router.delete('/:id', async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json({ message: 'Employee deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting employee', error });
  }
});

router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { active } = req.body;

        // Ensure the active field is provided
        if (typeof active !== 'boolean') {
            return res.status(400).json({ message: 'Invalid status value' });
        }

        const updatedEmployee = await Employee.findByIdAndUpdate(
            id,
            { active },
            { new: true }
        );

        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.json(updatedEmployee);
    } catch (error) {
        console.error('Error updating employee status:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
