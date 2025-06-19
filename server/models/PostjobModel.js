// postJob.model.js
const mongoose = require('mongoose');

const postJobSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  tags: { type: [String], default: [] },
  jobStatus:{type:String,enum:["Active","Expired"],default:"Active"},
  salary: {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
    type: { type: String, enum: ['Hourly', 'Monthly', 'Yearly'], required: true },
  },
  education: { type: String, enum: ['High School', "Bachelor's", "Master's", 'PhD'], required: true },
  experience: { type: String, enum: ['Fresher', '1-2 Years', '3-5 Years', '5+ Years'], required: true },
  jobType: { type: String, enum: ['Full-Time', 'Part-Time', 'Contract', 'Freelance'], required: true },
  vacancies: { type: Number, required: true},
  expirationDate: { type: Date, required: true},
  jobLevel: { type: String, enum: ['Entry Level', 'Mid Level', 'Senior Level'], required: true },
  location: {
    country: { type: String, required: true },
    city: { type: String, required: true },
  },
  benefits: { type: [String], default: [] },
  jobDescription: { type: String, required: true },
}, { timestamps: true });

const PostJob = mongoose.model('PostJob', postJobSchema);
module.exports = PostJob;
