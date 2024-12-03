const express = require("express");
const router = express.Router();
const { createOrUpdateProfile, getProfileDetails} = require("../controller/ProfileController");
const authenticateUser = require("../middleware/AuthMiddleware");




// Routes

router.post("/create-profile",authenticateUser,  createOrUpdateProfile);

router.get("/getprofiledetails/:userid",authenticateUser, getProfileDetails);


module.exports = router;
