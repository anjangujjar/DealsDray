const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'uploads')));

// Routes
const authRoutes = require('./routes/auth');
const employeeRoutes = require('./routes/employeeRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
