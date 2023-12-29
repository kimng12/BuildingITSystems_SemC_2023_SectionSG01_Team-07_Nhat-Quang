const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Student = require('../models/student');
const passport = require('passport');


// Multer configuration for profile image uploads

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/student-profiles'); // Set the destination folder for uploaded files
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
      const profileImage = req.file ? req.file.path : null; // Get the file path from the uploaded image
  
      // Add additional validation if needed
  
      const newStudent = new Student({ name, email, password, gender, address, age, profileImage });
      await newStudent.save();
  
      // Redirect to the login page after successful registration
      res.redirect('/students/login');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
});
  

// Other student routes
router.post('/login', passport.authenticate('student', {
    successRedirect: '/students/dashboard',
    failureRedirect: '/students/login',
    failureFlash: true,
  }));
  
  // Student Dashboard
  router.get('/dashboard', isAuthenticated, (req, res) => {
    // Render the student dashboard
    res.render('student/dashboard', { user: req.user });
  });
  
  // Student Profile
  router.get('/profile', isAuthenticated, (req, res) => {
    // Render the student profile page
    res.render('student/profile', { user: req.user });
  });
  
  // Student Logout
  router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
  
  // Middleware to check authentication
  function isAuthenticated(req, res, next) {
    if (req.isAuthenticated() && req.user.userType === 'student') {
      return next();
    }
    res.redirect('/');
}


module.exports = router;
