const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); 

const CompanySchema = new mongoose.Schema({
  CompanyRegister: {
    CompanyName: String,
    email: String,
    phone: String,
    password: { type: String, required: true },
    role: String,
    otp: {type: String,default: null},
    otpCreatedAt: {type: Date,default: null},
    isVerified: {type: Boolean,default: false},
  },
  companyInfo: {
    logo: String,
    bannerImage: String,
    aboutUs: String,
  },
  foundingInfo: {
    foundersName: String,
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
    email: String,
    phone: String,
    location: String,
    address: String,
  },
});

// Hash password before saving to the database
CompanySchema.pre("save", async function (next) {
  if (!this.isModified("CompanyRegister.password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.CompanyRegister.password = await bcrypt.hash(this.CompanyRegister.password, salt);
  next();
});

// Compare entered password with the hashed password in the database
CompanySchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.CompanyRegister.password);
};

module.exports = mongoose.model("Company", CompanySchema);
