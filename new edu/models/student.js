const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  profileImage: {
    type: String, 
  },
});

StudentSchema.pre('save', async function(next) {
  const student = this;
  if (!student.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(student.password, salt);
  student.password = hash;

  next();
});

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;

