const express = require("express");
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
  updateProfile,
} = require("../controller/UserController");
const { authenticateUser, authorizeRoles } = require("../middleware/AuthMiddleware");
const upload = require("../middleware/UploadsMiddleware");

// Authentication routes
router.post("/usercreate", registerUser); 
router.post("/verify-otp", verifyOTP); 
router.post("/login", signin); 

// Password reset and OTP management
router.post("/forgot-password", forgotpassword); 
router.post("/reset-password/:token", resetpassword); 
router.post("/resend-otp", resendOTP); 

// Protected user routes (authentication required)
router.get("/getuserdetails", authenticateUser, getUserDetails); 
router.put(
  "/update-profile",
  authenticateUser,
  upload.fields([
    { name: "resume", maxCount: 1 }, 
    { name: "profilePicture", maxCount: 1 }, 
  ]),
  updateProfile
);

// Admin-only routes
router.get(
  "/getAllUser",
  authenticateUser,
  authorizeRoles("admin"), 
  getAllUsers
);
router.delete(
  "/delete/:id",
  authenticateUser,
  authorizeRoles("admin"), 
  deleteUser
);



module.exports = router;
