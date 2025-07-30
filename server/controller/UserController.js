const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");
const Company = require("../models/CompanyModel");
const crypto = require("crypto");
const verifyEmailTemplate = require("../Email Template/VerifyEmailTemplate");
const sendEmail = require("../utils/EmailService");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");

const generateOTP = () => crypto.randomInt(1000, 9999).toString();

const registerUser = async (req, res) => {
  try {
    const {
      email,
      phone,
      password,
      role = "candidate",
      username,
      CompanyName,
    } = req.body;

    // Validate role
    const validRoles = ["candidate", "employer"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({
        error: `Invalid role specified. Valid roles: ${validRoles.join(", ")}.`,
      });
    }

    // Check required fields based on role
    if (role === "candidate") {
      if (!username || !email || !phone || !password) {
        return res.status(400).json({
          error:
            "All fields (username, email, phone, password) are required for candidate registration.",
        });
      }
    } else if (role === "employer") {
      if (!CompanyName || !email || !phone || !password) {
        return res.status(400).json({
          error:
            "All fields (CompanyName, email, phone, password) are required for employer registration.",
        });
      }
    }

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    const existingCompany = await Company.findOne({
      "CompanyRegister.email": email,
    });

    if (existingUser || existingCompany) {
      return res.status(400).json({ error: "Email already registered." });
    }
    // Generate OTP for new user or employer
    const otp = generateOTP();
    const otpCreatedAt = new Date();

    // Role-based logic
    if (role === "candidate") {
      // Save candidate to `User` collection
      const newUser = new User({
        username,
        email,
        phone,
        password,
        role,
        otp,
        otpCreatedAt,
        isVerified: false,
      });

      await newUser.save();
      // Send OTP email to the candidate
      await sendEmail(
        email,
        "Email verification",
        verifyEmailTemplate(otp, username)
      );

      return res.status(201).json({
        message:
          "Candidate registered successfully. Please verify your email using the OTP.",
      });
    } else if (role === "employer") {
      // Save employer to `Company` collection
      const newCompany = new Company({
        CompanyRegister: {
          CompanyName,
          email,
          phone,
          password,
          role,
          otp,
          otpCreatedAt,
          isVerified: false,
        },
      });

      await newCompany.save();
      console.log(newCompany);
      await sendEmail(
        email,
        "Email verification",
        verifyEmailTemplate(otp, CompanyName)
      );

      return res.status(201).json({
        message:
          "Employer registered successfully. Please verify your email using the OTP.",
      });
    }
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({
      error: "Server error. Please try again later.",
      details: error.message,
    });
  }
};

const verifyOTP = asyncHandler(async (req, res) => {
  const { email, otp, role } = req.body;

  try {
    // Role-based query
    const user =
      role === "candidate"
        ? await User.findOne({ email })
        : await Company.findOne({ "CompanyRegister.email": email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User or Company not found",
      });
    }

    // Role-specific validation
    // if (role === "candidate" && user.username !== username) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Username mismatch for candidate.",
    //   });
    // }

    // if (
    //   role === "employer" &&
    //   user.CompanyRegister.CompanyName !== CompanyName
    // ) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Company name mismatch for employer.",
    //   });
    // }

    // Retrieve OTP and verify it
    const otpToCheck =
      role === "candidate" ? user.otp : user.CompanyRegister.otp;
    const otpCreatedAt =
      role === "candidate"
        ? user.otpCreatedAt
        : user.CompanyRegister.otpCreatedAt;

    if (!otpToCheck || !otpCreatedAt) {
      return res.status(400).json({
        success: false,
        message: "No OTP found or already verified.",
      });
    }

    // Check OTP expiry (5 minutes)
    const otpAge = (new Date() - otpCreatedAt) / 1000;
    if (otpAge > 300) {
      return res.status(400).json({
        success: false,
        message: "OTP expired. Please request a new one.",
      });
    }

    if (otpToCheck !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP.",
      });
    }

    // Mark as verified and clear OTP
    if (role === "candidate") {
      user.otp = null;
      user.otpCreatedAt = null;
      user.isVerified = true;
    } else {
      user.CompanyRegister.otp = null;
      user.CompanyRegister.otpCreatedAt = null;
      user.CompanyRegister.isVerified = true;
    }

    await user.save();

    return res.json({
      success: true,
      message: "OTP verified successfully.",
      role,
      username: role === "candidate" ? user.username : undefined,
      CompanyName:
        role === "employer" ? user.CompanyRegister.CompanyName : undefined,
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
    let user, role;

    // Check if the user is an employer (company)
    user = await Company.findOne({ "CompanyRegister.email": email });
    if (user) {
      role = "employer";
      console.log("Employer found:", user);

      // Check if the employer is verified
      if (!user.CompanyRegister.isVerified) {
        return res.status(400).json({ message: "Employer is not verified" });
      }

      // Check the password for employer
      const validPassword = await user.matchPassword(password);
      if (!validPassword) {
        return res.status(400).json({ message: "Invalid password for employer" });
      }

      // Generate JWT token for the employer
      const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h",
      });
      console.log(user)
      // Send the response for employer login
      return res.json({
        token,
        user: {
          id: user._id,
          CompanyName: user.CompanyRegister.CompanyName,  
          phone: user.CompanyRegister.phone,
          email: user.CompanyRegister.email,
          role,
        },
     
        message: `Login successful as ${role}`,
      });
    }

    // Check if the user is a candidate (normal user)
    user = await User.findOne({ email });
    if (user) {
      role = "candidate";
      console.log("Candidate found:", user);

      // Check if the candidate is verified
      if (!user.isVerified) {
        return res.status(400).json({ message: "Candidate is not verified" });
      }

      // Check the password for candidate
      const validPassword = await user.matchPassword(password);
      if (!validPassword) {
        return res.status(400).json({ message: "Invalid password for candidate" });
      }

      // Generate JWT token for the candidate
      const token = jwt.sign({ _id: user._id, role }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h",
      });

      // Send the response for candidate login
      return res.json({
        token,
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          role,
        },
        message: `Login successful as ${role}`,
      });
    }

    // If no user is found (not registered)
    return res.status(400).json({ message: "User not registered" });

  } catch (error) {
    console.error("Sign-in error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


const getUserDetails = async (req, res) => {
  try {
    // Find the user by ID (from JWT token or session)
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Construct response object
    const userDetails = {
      id: user._id,
      email: user.email,
      phone: user.phone,
      username: user.username,
      dob: user.dob,
      age: user.age,
      gender: user.gender,
      maritalStatus: user.maritalStatus,
      address: user.address,
      qualificationInput: user.qualificationInput,
      jobRole: user.jobRole,
      experience: user.experience,
      nationality: user.nationality,
      graduationYear: user.graduationYear,
      skills: user.skills,
      resume: user.resume ? user.resume : null,
      areaOfInterest: user.areaOfInterest,
      profilePicture: user.profilePicture,
    };

    // If resume exists, return the file path or URL (you may need to adjust depending on storage)
    if (user.resume) {
      // Assuming user.resume stores the file path or URL to the file
      userDetails.resume = user.resume;
    } else {
      userDetails.resume = null; // Ensure null if no resume exists
    }

    // Send the response with the user details
    res.json(userDetails);

    console.log(user); // Log user data to verify
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};
const updateProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id; // Extract user ID from token
  const updates = req.body;

  console.log("Files received:", req.files);

  try {
    // Fetch the current user's profile
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Handle file uploads
    if (req.files) {
      // Handle resume upload
      if (req.files.resume) {
        if (user.resume) {
          const oldResumePath = path.join(__dirname, "..", user.resume);

          // Remove old resume file
          if (fs.existsSync(oldResumePath)) {
            fs.unlinkSync(oldResumePath);
          }
        }

        updates.resume = req.files.resume[0].path;
      }

      // Handle profile picture upload
      if (req.files.profilePicture) {
        if (user.profilePicture) {
          const oldProfilePicturePath = path.relative(path.join(__dirname, ".."), req.files.profilePicture[0].path);

          // Remove old profile picture file
          if (fs.existsSync(oldProfilePicturePath)) {
            fs.unlinkSync(oldProfilePicturePath);
          }
        }

        updates.profilePicture = req.files.profilePicture[0].path;
      }
    }

    // Check if the profile is already complete
    const requiredFields = [
      "username",
      "phone",
      "dob",
      "gender",
      "maritalStatus",
      "address",
      "skills",
      "jobRole",
      "areaOfInterest",
      "experience",
      "nationality",
      "graduationYear",
      "qualificationInput",
    ];
    const isProfileComplete = requiredFields.every((field) => user[field]);

    if (!isProfileComplete) {
      // First-time profile update
      const missingFields = requiredFields.filter((field) => !updates[field]);
      if (missingFields.length > 0) {
        return res.status(400).json({
          success: false,
          message: `First-time profile completion requires all fields: ${missingFields.join(
            ", "
          )}`,
        });
      }
    } else {
      // Check if `email` is being updated
      if (updates.email && updates.email !== user.email) {
        return res.status(400).json({
          success: false,
          message: "Email cannot be updated.",
        });
      }
    }

    // Apply updates
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: isProfileComplete
        ? "Profile updated successfully."
        : "Profile completed successfully.",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
});

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
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
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

module.exports = {
  verifyOTP,
  registerUser,
  signin,
  forgotpassword,
  resetpassword,
  resendOTP,
  getUserDetails,
  updateProfile,
  getAllUsers,
  deleteUser,
};
