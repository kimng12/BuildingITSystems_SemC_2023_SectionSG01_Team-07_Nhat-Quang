const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Student = require('../models/student');
const Tutor = require('../models/tutor');
const bcrypt = require('bcrypt');

passport.use('student', new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  try {
    const student = await Student.findOne({ email });

    if (!student) {
      return done(null, false, { message: 'Incorrect email.' });
    }

    const passwordMatch = await bcrypt.compare(password, student.password);

    if (!passwordMatch) {
      return done(null, false, { message: 'Incorrect password.' });
    }

    return done(null, student);
  } catch (error) {
    return done(error);
  }
}));

passport.use('tutor', new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  try {
    const tutor = await Tutor.findOne({ email });

    if (!tutor) {
      return done(null, false, { message: 'Incorrect email.' });
    }

    const passwordMatch = await bcrypt.compare(password, tutor.password);

    if (!passwordMatch) {
      return done(null, false, { message: 'Incorrect password.' });
    }

    return done(null, tutor);
  } catch (error) {
    return done(error);
  }
}));

passport.serializeUser((user, done) => {
  done(null, { id: user.id, userType: user.userType });
});

passport.deserializeUser(async ({ id, userType }, done) => {
  try {
    if (userType === 'student') {
      const student = await Student.findById(id);
      done(null, student);
    } else if (userType === 'tutor') {
      const tutor = await Tutor.findById(id);
      done(null, tutor);
    } else {
      done(null, false);
    }
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
