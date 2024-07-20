// backend/app.js
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();
app.use(express.json());

// Set up storage for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// Use employee routes
app.use('/api/employees', upload.single('f_Image'), employeeRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/employee_management', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
