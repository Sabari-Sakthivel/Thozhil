const express = require("express");
const router = express.Router();
const {
  addOrUpdateCompanyInfo,
  addOrUpdateFoundingInfo,
  addSocialMediaProfile,
  updateAccountSettings,
  deleteSocialMediaProfile,
  getAllCompanies,
  PostJobdetails,
  getJobDetails
} = require("../controller/CompanyController");
const CompanyFileupload =require("../middleware/CompanyFileupload")
const CompanyController=require("../controller/CompanyController");
const { authenticateUser } = require("../middleware/AuthMiddleware");

// Add or Update Company Info
router.post("/company-info", CompanyFileupload, CompanyController.addOrUpdateCompanyInfo);

// Add or Update Founding Info
router.post("/founding-info", addOrUpdateFoundingInfo);

// Add Social Media Profiles
router.post("/social-media", addSocialMediaProfile);

// Update Account Settings
router.post("/account-settings", updateAccountSettings);

// Get Company Data
router.get("/getcompanydata",authenticateUser, CompanyController.getCompanyDetails);

// Delete Social Media Profile
router.delete("/delete-social-media", deleteSocialMediaProfile);

// get all companies ....
router.get("/getallcompanies",getAllCompanies)

// Post  Jobdetails 
router.post("/postjobdetails",PostJobdetails)

// Get all Posted jobs
router.get("/getalljobdetails",getJobDetails)
module.exports = router;
