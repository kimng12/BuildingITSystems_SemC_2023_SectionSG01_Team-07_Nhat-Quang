const mongoose = require('mongoose');

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
  },
  password: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String, // Assuming you store the file path or URL
  },
  phoneNumber: {
    type: Number,
  },
  experience: {
    type: Number,
  },
  subjects: {
    type: [String], // Array of subjects the tutor can teach
  },
  qualifications: {
    type: String, // Assuming you store the file path or URL for the uploaded qualifications
  },
  gender: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  languages: {
    type: [String], // Array of languages the tutor can communicate in
  },
});

const Tutor = mongoose.model('Tutor', TutorSchema);

module.exports = Tutor;
