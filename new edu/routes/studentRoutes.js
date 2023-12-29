const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');
const Student = require('../models/student');
const { isStudent, isAuthenticated } = require('../middleware/auth'); 

// Multer configuration for profile image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/student-profiles');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Student Registration with Profile Image
router.post('/register', upload.single('profileImage'), async (req, res) => {
  try {
    const { name, email, password, gender, address, age } = req.body;
    const profileImage = req.file ? req.file.path : null;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = new Student({
      name,
      email,
      password: hashedPassword,
      gender,
      address,
      age,
      profileImage,
    });

    await newStudent.save();

    res.redirect('/students/login');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Other student routes
// Protected Student Dashboard Route
router.get('/dashboard', isStudent, (req, res) => {
  // Render the student dashboard
  res.render('student/dashboard', { user: req.user });
});

// Protected Student Profile Route
router.get('/profile', isAuthenticated, isStudent, (req, res) => {
  // Render the student profile page
  res.render('student/profile', { user: req.user });
});

// Student Logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});


module.exports = router;

