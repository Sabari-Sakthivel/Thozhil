const Profile = require("../models/UserProfileModel");

const createOrUpdateProfile = async (req, res) => {
  try {
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

    // Check if profile exists
    let profile = await Profile.findOne({ email });

    if (!profile) {
      // Create new profile
      profile = new Profile({
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
    return res.status(500).json({ message: "Server error", error });
  }
};

// const getProfile = async (req, res) => {
//   try {
//     const { email } = req.params;

//     // Find the profile by email
//     const profile = await Profile.findOne({ email });

//     if (!profile) {
//       return res.status(404).json({ message: "Profile not found" });
//     }

//     return res.status(200).json({ profile });
//   } catch (error) {
//     console.error("Error in getProfile:", error);
//     return res.status(500).json({ message: "Server error", error });
//   }
// };

module.exports = { createOrUpdateProfile};
