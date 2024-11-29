// models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // to hash passwords

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
      unique: true, // ensure no duplicate email
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true, // ensure no duplicate phone number
      minlength: 10,
      maxlength: 10,
      match: /^[6-9]\d{9}$/, // regex for Indian phone numbers
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    otp: {
      type: String,
      default: null, // stores the OTP
    },
    otpCreatedAt: {
      type: Date,
      default: null, // stores the time when OTP was generated
    },
    isVerified: {
      type: Boolean,
      default: false, // indicates if OTP has been verified
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
