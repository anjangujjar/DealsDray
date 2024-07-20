//backend\seedDatabase.js
const mongoose = require('mongoose');
const User = require('./models/User');
const Employee = require('./models/Employee');
require('dotenv').config();  // Load environment variables

const mongoURI = process.env.MONGO_URI;

const seedDatabase = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

    // Create an admin user
    const admin = new User({
      username: 'admin',
      password: '$2b$10$examplehashedpassword', // Replace with a hashed password
      isAdmin: true
    });
    await admin.save();
    console.log('Admin user created');

    // Create sample employees
    const employees = [
      {
        f_Id: 'E001',
        f_Name: 'John Doe',
        f_Email: 'john.doe@example.com',
        f_Mobile: '1234567890',
        f_Designation: 'Developer',
        f_gender: 'M',
        f_Course: ['BCA'],
        f_Createdate: '2024-07-20',
        f_Image: ''  // Path to image if applicable
      },
      {
        f_Id: 'E002',
        f_Name: 'Jane Smith',
        f_Email: 'jane.smith@example.com',
        f_Mobile: '0987654321',
        f_Designation: 'Designer',
        f_gender: 'F',
        f_Course: ['MCA'],
        f_Createdate: '2024-07-21',
        f_Image: ''  // Path to image if applicable
      }
    ];

    await Employee.insertMany(employees);
    console.log('Sample employees created');

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

seedDatabase();
