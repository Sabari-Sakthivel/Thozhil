const mongoose = require("mongoose");

const UserProfileSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, required: true },
  age: { type: Number, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  maritalStatus: { type: String, required: true },
  address: { type: String, required: true },
  education: { type: String,required: true },
  skills: { type: String,required: true },
  graduationYear: { type: Number,required: true },
  nationality: { type: String,required: true },
  jobRole: { type: String,required: true },
  resume: { type: String,required: true },
  experience: { type: Number,required: true },
  areaOfInterest: { type: String,required: true },
});

module.exports = mongoose.model("UserProfile", UserProfileSchema);
