// auth.js - Authentication Middleware

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      // User is authenticated, continue to the next middleware
      return next();
    } else {
      // User is not authenticated, redirect to the login page
      res.redirect('/login');
    }
  };
  
  const isStudent = (req, res, next) => {
    if (req.isAuthenticated() && req.user.userType === 'student') {
      // Student is authenticated, continue to the next middleware
      return next();
    } else {
      // Student is not authenticated, redirect to the login page
      res.redirect('/students/login');
    }
  };
  
  const isTutor = (req, res, next) => {
    if (req.isAuthenticated() && req.user.userType === 'tutor') {
      // Tutor is authenticated, continue to the next middleware
      return next();
    } else {
      // Tutor is not authenticated, redirect to the login page
      res.redirect('/tutors/login');
    }
  };
  
  module.exports = { isAuthenticated, isStudent, isTutor };
  