const express = require('express');
const router = express.Router();
const {
  registerUser,
  verifyOTP,
  signin,
  forgotpassword,
  resetpassword,
  resendOTP,
  getUserDetails,
  getAllUsers,
  deleteUser,
  
  updateProfile
} = require('../controller/UserController');
const { protectUser } = require('../middleware/UserMiddileware');
const upload = require("../middleware/UploadsMiddleware");




// authendication routes ............
// Route to register a new user
router.post('/usercreate', registerUser);

// Route to verify OTP for user registration
router.post('/verify-otp', verifyOTP);

// Route to sign in a user
router.post('/login', signin);

router.get('/getuserdetails',protectUser,getUserDetails)


// update the profile 
router.put("/updateProfile",protectUser, updateProfile);

// Route to update the profile (with file upload)
// router.put("/update-profile",protectUser,  upload.single("resume"), updateProfile);
router.put(
  "/update-profile",
  protectUser,
  upload.fields([
    { name: "resume", maxCount: 1 }, // Handle resume file upload
    { name: "profilePicture", maxCount: 1 }, // Handle profile picture file upload
  ]),
  updateProfile
); 
// Route to handle forgot password requests
router.post('/forgot-password', forgotpassword);

// Route to reset the password
router.post('/reset-password/:token', resetpassword);

// Route to resend OTP to the user’s email
router.post('/resend-otp', resendOTP);
router.get('/getAllUser', getAllUsers);
router.delete('/delete/:id', deleteUser);



// profile updation routes



 // Protect this route with middleware

module.exports = router;
