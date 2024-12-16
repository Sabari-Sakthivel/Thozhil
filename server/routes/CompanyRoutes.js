const express = require("express");
const router = express.Router();
const {
  addOrUpdateCompanyInfo,
  addOrUpdateFoundingInfo,
  addSocialMediaProfile,
  updateAccountSettings,
  getCompanyData,
  deleteSocialMediaProfile,
} = require("../controller/CompanyController");
const CompanyFileupload =require("../middleware/CompanyFileupload")
const CompanyController=require("../controller/CompanyController")

// Add or Update Company Info
router.post("/company-info", CompanyFileupload, CompanyController.addOrUpdateCompanyInfo,
);

// Add or Update Founding Info
router.post("/founding-info", addOrUpdateFoundingInfo);

// Add Social Media Profiles
router.post("/social-media", addSocialMediaProfile);

// Update Account Settings
router.post("/account-settings", updateAccountSettings);

// Get Company Data
router.get("/:companyId", getCompanyData);

// Delete Social Media Profile
router.delete("/social-media", deleteSocialMediaProfile);

module.exports = router;
