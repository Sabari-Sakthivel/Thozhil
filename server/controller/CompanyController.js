const Company = require("../models/CompanyModel");
const PostJob = require('../models/PostjobModel'); 

exports.addOrUpdateCompanyInfo = async (req, res) => {
  const { companyInfo } = req.body;

  try {
    const parsedCompanyInfo = JSON.parse(companyInfo);

    const updateData = {
      companyInfo: parsedCompanyInfo,
    };

    if (req.files && req.files.logo) {
      updateData.companyInfo.logo = req.files.logo[0].path.replace(/\\/g, "/");
    }
    if (req.files && req.files.banner) {
      updateData.companyInfo.bannerImage = req.files.banner[0].path.replace(
        /\\/g,
        "/"
      );
    }

    const company = await Company.findOneAndUpdate({}, updateData, {
      new: true,
      upsert: true,
    });

    res.status(200).json({ success: true, company });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.addOrUpdateFoundingInfo = async (req, res) => {
  const { id, foundingInfo } = req.body;
  console.log(req.body);

  if (!id || !foundingInfo) {
    return res.status(400).json({
      success: false,
      message: "companyId and foundingInfo are required.",
    });
  }

  try {
    const company = await Company.findByIdAndUpdate(
      id,
      { foundingInfo },
      { new: true, upsert: true }
    );

    if (!company) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found." });
    }

    res.status(200).json({ success: true, company });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.addSocialMediaProfile = async (req, res) => {
  const { id, socialMediaProfiles } = req.body;

  // Validate request body
  if (
    !id ||
    !Array.isArray(socialMediaProfiles) ||
    socialMediaProfiles.length === 0
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid input. 'id' and 'socialMediaProfiles' are required.",
    });
  }

  try {
    // Update the company document by adding new social media profiles
    const company = await Company.findByIdAndUpdate(
      id,
      { $push: { socialMediaProfiles: { $each: socialMediaProfiles } } },
      { new: true }
    );

    // If company not found, return an error
    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found.",
      });
    }

    // Respond with the updated company document
    res.status(200).json({
      success: true,
      message: "Social media profiles added successfully.",
      socialMediaProfiles: company.socialMediaProfiles, // Return updated profiles
    });
  } catch (error) {
    console.error("Error adding social media profiles:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while adding social media profiles.",
      error: error.message,
    });
  }
};

exports.updateAccountSettings = async (req, res) => {
  const { id, accountSettings } = req.body;

  try {
    const company = await Company.findByIdAndUpdate(
      id,
      { accountSettings },
      { new: true }
    );
    res.status(200).json({ success: true, company });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCompanyDetails = async (req, res) => {
  try {
    // Fetch company info directly from the database
    const company = await Company.findOne({}); // Modify this query as needed

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "No company information found.",
      });
    }

    const logoUrl = company.companyInfo.logo
      ? `http://localhost:4000/${company.companyInfo.logo}`
      : null;
    const bannerUrl = company.companyInfo.bannerImage
      ? `http://localhost:4000/${company.companyInfo.bannerImage}`
      : null;

    // Extract founding information
    const foundingInfo = company.foundingInfo || null;
    const accountSettings = company.accountSettings || null;
    // Return the company details including CompanyName and companyInfo
    return res.status(200).json({
      success: true,
      message: "Company info retrieved successfully.",
      companyDetails: {
        id: company._id,
        CompanyName: company.CompanyRegister.CompanyName,
        email: company.CompanyRegister.email,
        phone: company.CompanyRegister.phone,
        logo: logoUrl,
        bannerImage: bannerUrl,
        aboutUs: company.companyInfo.aboutUs,
        foundingInfo: foundingInfo,
        accountSettings: accountSettings,
        socialMediaProfiles: company.socialMediaProfiles || [],
      },
    });
  } catch (error) {
    console.error("Error fetching company info:", error.message);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching company info.",
      error: error.message,
    });
  }
};

exports.deleteSocialMediaProfile = async (req, res) => {
  const { companyId, platform } = req.body;

  try {
    const company = await Company.findById(companyId);
    if (!company)
      return res
        .status(404)
        .json({ success: false, message: "Company not found" });

    company.socialMediaProfiles = company.socialMediaProfiles.filter(
      (profile) => profile.platform !== platform
    );
    await company.save();

    res.status(200).json({ success: true, company });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllCompanies = async (req, res) => {
  try {
    // Fetch all companies from the database
    const companies = await Company.find(); // No need to pass any parameters

    return res.status(200).json({
      success: true,
      data: companies,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.PostJobdetails = async (req, res) => {

  try {
    const {
      jobTitle,
      tags,
      jobStatus,
      salary,
      education,
      experience,
      jobType,
      vacancies , // Default value
      expirationDate , // Default to today
      jobLevel , // Default to Entry Level
      location,
      benefits,
      jobDescription,
    } = req.body;

    //Validate salary object
    if (
      !salary ||
      typeof salary !== "object" ||
      !salary.min ||
      !salary.max ||
      !salary.type
    ) {
      return res.status(400).json({ message: "Invalid salary details" });
    }

    // Validate location object
    if (
      !location ||
      typeof location !== "object" ||
      !location.country ||
      !location.city
    ) {
      return res.status(400).json({ message: "Invalid location details" });
    }

    const newJob = new PostJob({
      jobTitle,
      tags,
      jobStatus,
      salary,
      education,
      experience,
      jobType,
      vacancies,
      expirationDate,
      jobLevel,
      location,
      benefits,
      jobDescription,
    });

    await newJob.save();

    res.status(201).json({ message: "Job posted successfully", job: newJob });
  } catch (error) {
    console.error("Error posting job:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
exports.getJobDetails = async (req,res) => {
  try {
    const Jobs= await PostJob.find();
    return res.status(200).json({
      success:true,
      data:Jobs,
    });
  } catch (error) {
    res.status(500).json
  }

};
