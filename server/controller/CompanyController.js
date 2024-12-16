const Company = require("../models/CompanyModel");



exports.addOrUpdateCompanyInfo = async (req, res) => {
  const { companyInfo } = req.body;

  try {
    
    const parsedCompanyInfo = JSON.parse(companyInfo);

    const updateData = {
      companyInfo: parsedCompanyInfo,
    };

    
    if (req.files && req.files.logo) {
      updateData.logo = req.files.logo[0].path;
    }

    
    if (req.files && req.files.banner) {
      updateData.bannerImage = req.files.banner[0].path;
    }

    const company = await Company.findOneAndUpdate(
      {}, 
      updateData,
      { new: true, upsert: true } 
    );

    res.status(200).json({ success: true, company });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};




// Controller to add or update founding info
exports.addOrUpdateFoundingInfo = async (req, res) => {
  const { companyId, foundingInfo } = req.body;

  try {
    const company = await Company.findByIdAndUpdate(
      companyId,
      { foundingInfo },
      { new: true, upsert: true }
    );
    res.status(200).json({ success: true, company });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controller to add or update social media profiles
exports.addSocialMediaProfile = async (req, res) => {
  const { companyId, socialMediaProfiles } = req.body;

  try {
    const company = await Company.findByIdAndUpdate(
      companyId,
      { socialMediaProfiles },
      { new: true }
    );
    res.status(200).json({ success: true, company });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controller to update account settings
exports.updateAccountSettings = async (req, res) => {
  const { companyId, accountSettings } = req.body;

  try {
    const company = await Company.findByIdAndUpdate(
      companyId,
      { accountSettings },
      { new: true }
    );
    res.status(200).json({ success: true, company });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controller to retrieve company data
exports.getCompanyData = async (req, res) => {
  const { companyId } = req.params;

  try {
    const company = await Company.findById(companyId);
    if (!company)
      return res
        .status(404)
        .json({ success: false, message: "Company not found" });
    res.status(200).json({ success: true, company });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controller to delete a social media profile
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
