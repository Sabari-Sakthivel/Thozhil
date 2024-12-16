const Company = require("../models/CompanyModel");

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
  const { companyId, foundingInfo } = req.body;

  if (!companyId || !foundingInfo) {
    return res.status(400).json({
      success: false,
      message: "companyId and foundingInfo are required.",
    });
  }

  try {
    const company = await Company.findByIdAndUpdate(
      companyId,
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
  const { companyId, socialMediaProfiles } = req.body;

  try {
    const company = await Company.findByIdAndUpdate(
      companyId,
      { $push: { socialMediaProfiles: { $each: socialMediaProfiles } } }, 
      { new: true }
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
