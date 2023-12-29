const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');
const Tutor = require('../models/tutor');
const { isTutor, isAuthenticated } = require('../middleware/auth'); 

// Multer configuration for profile photo uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/tutor-profiles');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Tutor Registration with Profile Photo
router.post('/register', upload.single('profilePhoto'), async (req, res) => {
  try {
    const { salutation, name, email, password, phoneNumber, experience, subjects, qualifications, gender, description, languages } = req.body;
    const profilePhoto = req.file ? req.file.path : null;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newTutor = new Tutor({
      salutation,
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      experience,
      subjects: subjects.split(','), // Assuming subjects are provided as a comma-separated string
      qualifications,
      gender,
      description,
      languages: languages.split(','), // Assuming languages are provided as a comma-separated string
      profilePhoto,
    });

    await newTutor.save();

    res.redirect('/tutors/login');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Other tutor routes
router.get('/dashboard', isTutor, (req, res) => {
  // Render the tutor dashboard
  res.render('tutor/dashboard', { user: req.user });
});

// Protected Tutor Profile Route
router.get('/profile', isAuthenticated, isTutor, (req, res) => {
  // Render the tutor profile page
  res.render('tutor/profile', { user: req.user });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
