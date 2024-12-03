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
  updateUserById
} = require('../controller/UserController');
const { protectUser } = require('../middleware/UserMiddileware');




// authendication routes ............
// Route to register a new user
router.post('/usercreate', registerUser);

// Route to verify OTP for user registration
router.post('/verify-otp', verifyOTP);

// Route to sign in a user
router.post('/login', signin);

router.get('/getuserdetails',protectUser,getUserDetails)

// Route to handle forgot password requests
router.post('/forgot-password', forgotpassword);

// Route to reset the password
router.post('/reset-password/:token', resetpassword);

// Route to resend OTP to the user’s email
router.post('/resend-otp', resendOTP);
router.get('/getAllUser', getAllUsers);
router.delete('/delete/:id', deleteUser);
router.put('/update/:id', updateUserById);



// profile updation routes



router.get('/me', protectUser, getUserDetails); // Protect this route with middleware

module.exports = router;
