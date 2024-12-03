const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
  },
  dob: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  maritalStatus: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 200,
  },
  skills: {
    type: String, 
    required: true,
  },
  jobRole: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50,
  },
  graduationYear: {
    type: Number,
    required: true,
    min: 1900,
    max: new Date().getFullYear(),
  },
  nationality: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50,
  },
  areaOfInterest: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100,
  },
  experience: {
    type: Number,
    required: true,
    min: 0, // Minimum years of experience
    max: 50, // Maximum years of experience
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
