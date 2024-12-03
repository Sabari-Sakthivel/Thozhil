const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const verifyEmailTemplate = require("../Email Template/VerifyEmailTemplate");
const sendEmail = require("../utils/EmailService");
const jwt = require("jsonwebtoken");

const generateOTP = () => crypto.randomInt(1000, 9999).toString();

const registerUser = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    // Generate OTP and set creation time
    const otp = generateOTP();
    const otpCreatedAt = new Date();

    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      if (!existingUser.isVerified) {
        // If user exists but is not verified, resend OTP
        existingUser.otp = otp;
        existingUser.otpCreatedAt = otpCreatedAt;
        await existingUser.save();

        // Send verification email
        await sendEmail(
          existingUser.email,
          "Email verification",
          verifyEmailTemplate(otp, existingUser.username) // Assuming username exists in the document
        );
        return res.json({
          message: `OTP sent to registered email ${existingUser.email}`,
        });
      } else {
        // If user is already verified
        return res.status(400).json({ error: "Email already registered." });
      }
    }

    // Create a new user
    const user = new User({
      username,
      email,
      phone,
      password,
      otp,
      otpCreatedAt,
      isVerified: false, // Set isVerified to false initially
    });

    await user.save();

    // Send verification email
    await sendEmail(
      user.email,
      "Email verification",
      verifyEmailTemplate(otp, username)
    );

    res.status(201).json({
      message: `User registered successfully. OTP sent to email ${user.email}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

const verifyOTP = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
console.log(req.body)
  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if OTP is set
    if (!user.otp || !user.otpCreatedAt) {
      return res.status(400).json({
        success: false,
        message: "No OTP found or OTP already verified",
      });
    }

    // Calculate OTP age in seconds
    const otpAge = (new Date() - user.otpCreatedAt) / 1000; // Age of the OTP in seconds

    // Check if OTP has expired (e.g., expire after 5 minutes)
    if (otpAge > 300) {
      return res.status(400).json({
        success: false,
        message: "OTP expired. Please request a new one.",
      });
    }

    // Check if OTP matches
    if (user.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // Clear OTP and mark the user as verified
    user.otp = null;
    user.otpCreatedAt = null;
    user.isVerified = true;

    // Save updated user
    await user.save();

    return res.json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    console.error("Error during OTP verification:", error);

    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
});

const signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !user.isVerified) {
      return res
        .status(400)
        .json({ message: "User not registered or not verified" });
    }

    const validPassword = await user.matchPassword(password);
    if (!validPassword) {
      return res.status(400).json({ message: "Password is incorrect" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token,user:user.username, message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ id: user._id, email: user.email, role: user.role });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const forgotpassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const otp = generateOTP();
  const otpCreatedAt = new Date();
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.otp = otp;
      user.otpCreatedAt = otpCreatedAt;
      await user.save();
      await sendEmail(
        user.email,
        "Email verification",
        verifyEmailTemplate(otp, user.name)
      );
      return res.json({ message: `OTP resent to email ${user.email}` });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
});

const resetpassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.KEY);
    const user = await User.findById(decoded.id);
    user.password = password;
    await user.save();
    res.json({ status: true, message: "Password updated" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Invalid token" });
  }
});

const resendOTP = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "User already verified" });
    }

    const otp = generateOTP();
    user.otp = otp;
    user.otpCreatedAt = new Date();
    await user.save();

    await sendEmail(
      user.email,
      "Email verification",
      verifyEmailTemplate(otp, user.name)
    );
    res.json({ message: `OTP resent to email ${user.email}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    await user.remove();
    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;

    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  verifyOTP,
  registerUser,
  signin,
  forgotpassword,
  resetpassword,
  resendOTP,
  getUserDetails,
  getAllUsers,
  deleteUser,
  updateUserById,
};
