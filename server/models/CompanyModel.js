const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
  companyInfo: {
    logo: String,
    bannerImage: String,
    companyName: String,
    aboutUs: String,
  },
  foundingInfo: {
    foundersName:String,
    organizationType: String,
    industryType: String,
    teamSize: String,
    yearOfEstablishment: Date,
    website: String,
    companyVision: String,
  },
  socialMediaProfiles: [
    {
      platform: String,
      link: String,
    },
  ],
  accountSettings: {
    location: String,
    email: String,
    phone: String,
    address:String,
  },
});

module.exports = mongoose.model("Company", CompanySchema);
