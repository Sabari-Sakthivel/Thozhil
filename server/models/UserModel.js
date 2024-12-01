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
    email: {
      type: String,
      required: true,
      unique: true, 
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
    
  },
  {
    timestamps: true,
  }
);

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
