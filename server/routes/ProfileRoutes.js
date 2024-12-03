const express = require("express");
const router = express.Router();
const { createOrUpdateProfile} = require("../controller/ProfileController");




// Routes

router.post("/profile",  createOrUpdateProfile);

// router.get("/profile/:email", getProfile);


module.exports = router;
