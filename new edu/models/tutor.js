const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const TutorSchema = new mongoose.Schema({
  salutation: {
    type: String,
    required: true,
  },
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
  profilePhoto: {
    type: String, 
  },
  phoneNumber: {
    type: Number,
  },
  experience: {
    type: Number,
  },
  subjects: {
    type: [String], 
  },
  qualifications: {
    type: String, 
  },
  gender: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  languages: {
    type: [String], 
  },
});

TutorSchema.pre('save', async function(next) {
  const tutor = this;
  if (!tutor.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(tutor.password, salt);
  tutor.password = hash;

  next();
});

const Tutor = mongoose.model('Tutor', TutorSchema);

module.exports = Tutor;

