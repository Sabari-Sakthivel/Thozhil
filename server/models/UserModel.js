// models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); 


const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 20,
    },
    dob: {
      type: Date,
    },

    gender: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true, 
      minlength: 10,
      maxlength: 10,
      match: /^[6-9]\d{9}$/, 
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    maritalStatus: {
      type: String,
    },
    address: {
      type: String,
      trim: true,
      minlength: 10,
      maxlength: 200,
    },
    skills: {
      type: String, 
    },
    resume: { type: String },
    profilePicture: {
      type: String, 
      default: null,
    },
    jobRole: {
      type: String,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    graduationYear: {
      type: Number,
      min: 1900,
      max: new Date().getFullYear(),
    },
    nationality: {
      type: String,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    areaOfInterest: {
      type: String,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    experience: {
      type: Number,
      min: 0, 
      max: 50, 
    },
    otp: {
      type: String,
      default: null, 
    },
    otpCreatedAt: {
      type: Date,
      default: null, 
    },
    isVerified: {
      type: Boolean,
      default: false, 
    },
    qualificationInput: { type: String, required: false }, 
    role: {
      type: String,
      enum: ["candidate", "employer", "admin"],
      default: "candidate", 
    },
  },
 
  {
    timestamps: true,
  }
);
// Virtual field for calculating age based on dob
userSchema.virtual("age").get(function () {
  const today = new Date();
  const birthDate = new Date(this.dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  // If the user hasn't had their birthday this year yet, subtract 1 from age
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
});

// Ensure virtual fields are included in JSON output
userSchema.set("toJSON", {
  virtuals: true,
});


// Hash password before saving to the database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  // Hash the password using bcryptjs
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare entered password with the hashed password in the database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
