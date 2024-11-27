const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");
const crypto = require("crypto");
const verifyEmailTemplate = require("../Email Template/VerifyEmailTemplate");
const sendEmail = require("../utils/EmailService");


const generateOTP = () => crypto.randomInt(1000, 9999).toString();

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, phonenumber, password } = req.body;
  // const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  // if (!emailRegex.test(email)) {
  //   return res.status(400).json({ message: 'Invalid email format' });
  // }
  console.log('Received data:', req.body);
    // Generate OTP for email verification
    const otp = generateOTP(); 
    const otpCreatedAt = new Date();

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    if (!existingUser.isVerified) {
      existingUser.otp = otp;
      existingUser.otpCreatedAt = otpCreatedAt;
      await existingUser.save();
      await sendEmail(existingUser.email, "Email verification", verifyEmailTemplate(otp, name));
      return res.json({ message: `OTP resent to email ${existingUser.email}` });
    } else {
      return res.status(400).json({ message: "Email already registered" });
    }
  }

  const user = await User.create({
    name,
    email,
    phonenumber,
    password,
    otp,
    otpCreatedAt,
  });

  if (user) {
    await sendEmail(user.email, "Email verification", verifyEmailTemplate(otp, name));
    res.json({ message: `OTP sent to email ${user.email}` });
  } else {
    res.status(400).json({ message: "User registration failed" });
  }
});


const getUser=()=>{
  console.log("hello world")
}




module.exports = {
  
  registerUser,
  getUser
  
};


 
