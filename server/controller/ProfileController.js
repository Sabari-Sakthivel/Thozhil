const Profile = require("../models/UserProfileModel");
const createOrUpdateProfile = async (req, res) => {
  try {
     // Ensure userId is available
    const userId = req.profile.userId;

    if (!userId) {
      return res.status(400).json({ message: "User ID is missing from request" });
    }

    const {
      fullName,
      dob,
      gender,
      age,
      phone,
      email,
      maritalStatus,
      address,
      skills,
      jobRole,
      graduationYear,
      nationality,
      areaOfInterest,
      experience,
    } = req.body;

    // Validate required fields
    if (!email || !fullName) {
      return res.status(400).json({ message: "Email and fullName are required" });
    }

    let profile = await Profile.findOne({ userId });

    if (!profile) {
      // Check if email exists before creating a new profile
      const existingEmail = await Profile.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ message: "Email already in use by another user" });
      }

      profile = new Profile({
        userId,
        fullName,
        dob,
        gender,
        age,
        phone,
        email,
        maritalStatus,
        address,
        skills,
        jobRole,
        graduationYear,
        nationality,
        areaOfInterest,
        experience,
      });
      await profile.save();
      return res.status(201).json({ message: "Profile created successfully", profile });
    } else {
      // Update existing profile
      profile.set({
        fullName,
        dob,
        gender,
        age,
        phone,
        email,
        maritalStatus,
        address,
        skills,
        jobRole,
        graduationYear,
        nationality,
        areaOfInterest,
        experience,
      });
      await profile.save();
      return res.status(200).json({ message: "Profile updated successfully", profile });
    }
  } catch (error) {
    console.error("Error in createOrUpdateProfile:", error);
    if (error.code === 11000) {
      return res.status(400).json({ message: "Duplicate email detected" });
    }
    return res.status(500).json({ message: "Server error", error: error.message || error });
  }
};



const getProfileDetails = async (req, res) => {
  try {
    const userId = req.query.userId; 
    console.log("Query Params:", req.query);

// Get user ID from query params

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await Profile.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ id: user._id, email: user.email, fullName: user.username, phone: user.phone });
  } catch (error) {
    console.error("Error fetching profile details:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



module.exports = { createOrUpdateProfile,getProfileDetails };
