const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Tutor = require('../models/tutor');
const passport = require('passport');

// Multer configuration for profile image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/tutor-profiles'); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Tutor Registration with Profile Image
router.post('/register', upload.single('profileImage'), async (req, res) => {
  try {
    const {
      salutation,
      name,
      email,
      password,
      phoneNumber,
      experience,
      subjects,
      qualifications,
      gender,
      description,
      languages,
    } = req.body;

    const profileImage = req.file ? req.file.path : null; // Get the file path from the uploaded image

    // Add additional validation if needed

    const newTutor = new Tutor({
      salutation,
      name,
      email,
      password,
      phoneNumber,
      experience,
      subjects: subjects.split(','), // Assuming subjects are provided as a comma-separated string
      qualifications,
      gender,
      description,
      languages: languages.split(','), // Assuming languages are provided as a comma-separated string
      profileImage
    });

    await newTutor.save();

    res.redirect('/tutor/login');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Other tutor routes
router.post('/login', passport.authenticate('tutor', {
  successRedirect: '/tutors/dashboard',
  failureRedirect: '/tutors/login',
  failureFlash: true,
}));

// Tutor Dashboard
router.get('/dashboard', isAuthenticated, (req, res) => {
  // Render the tutor dashboard
  res.render('tutor/dashboard', { user: req.user });
});

// Tutor Profile
router.get('/profile', isAuthenticated, (req, res) => {
  // Render the tutor profile page
  res.render('tutor/profile', { user: req.user });
});

// Tutor Logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// Middleware to check authentication
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated() && req.user.userType === 'tutor') {
    return next();
  }
  res.redirect('/');
}

module.exports = router;
