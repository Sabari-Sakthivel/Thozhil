import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

import { FaTwitter, FaLinkedin, FaInstagram, FaYoutube } from "react-icons/fa";
import axios from "axios";
import { format } from "date-fns";

const CompanyInfo = () => {
  const [activeTab, setActiveTab] = useState("Company Info");
  const [links, setLinks] = useState([
    {
      id: 1,
      platform: "LinkedIn",
      url: "",
      icon: <FaLinkedin className="text-blue-600" />,
    },
    {
      id: 2,
      platform: "Twitter",
      url: "",
      icon: <FaTwitter className="text-blue-400" />,
    },
    {
      id: 3,
      platform: "Instagram",
      url: "",
      icon: <FaInstagram className="text-pink-500" />,
    },
    {
      id: 4,
      platform: "YouTube",
      url: "",
      icon: <FaYoutube className="text-red-600" />,
    },
  ]);
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");

  const [logo, setLogo] = useState(null);
  const [banner, setBanner] = useState(null);
  const [CompanyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [aboutUs, setAboutUs] = useState("");
  const [id, setId] = useState("");

  const [foundersName, setFoundersName] = useState("");
  const [organizationType, setOrganizationType] = useState("");
  const [industryType, setIndustryType] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [yearOfEstablishment, setYearOfEstablishment] = useState("");
  const [website, setWebsite] = useState("");
  const [companyVision, setCompanyVision] = useState("");

  const handleInputChange = (id, value) => {
    setLinks((prevLinks) =>
      prevLinks.map((link) => (link.id === id ? { ...link, url: value } : link))
    );
  };

  const handlePlatformChange = (id, platform) => {
    const platformIcons = {
      LinkedIn: <FaLinkedin className="text-blue-600" />,
      Twitter: <FaTwitter className="text-blue-400" />,
      Instagram: <FaInstagram className="text-pink-500" />,
      YouTube: <FaYoutube className="text-red-600" />,
    };

    setLinks((prevLinks) =>
      prevLinks.map((link) =>
        link.id === id
          ? { ...link, platform, icon: platformIcons[platform] }
          : link
      )
    );
  };
  const handlePrevious = () => {
    const tabs = [
      "Company Info",
      "Founding Info",
      "Social Media Profile",
      "Account Settings",
    ];
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1]); // Move to the previous tab
    }
  };

  // Fetch company data on component mount
  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          alert("Session expired. Please log in again.");
          window.location.href = "/login";
          return;
        }

        const response = await axios.get(
          "http://localhost:4000/company/getcompanydata",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data) {
          const {
            CompanyName,
            aboutUs,
            email,
            phone,
            logo,
            bannerImage,
            id,
            foundingInfo,
            socialMediaProfiles,
            accountSettings,
          } = response.data.companyDetails;

          setId(id || "");
          setCompanyName(CompanyName || "");
          setEmail(email || "");
          setPhone(phone || "");
          setAboutUs(aboutUs || "");
          setLogo(logo || null);
          setBanner(bannerImage || null);

          if (foundingInfo) {
            setFoundersName(foundingInfo.foundersName || "");
            setOrganizationType(foundingInfo.organizationType || "");
            setIndustryType(foundingInfo.industryType || "");
            setTeamSize(foundingInfo.teamSize || "");
            setYearOfEstablishment(
              foundingInfo.yearOfEstablishment
                ? format(new Date(foundingInfo.yearOfEstablishment), "yyyy-MM-dd")
                : ""
            );

            setWebsite(foundingInfo.website || "");
            setCompanyVision(foundingInfo.companyVision || "");
          }

          if (socialMediaProfiles && Array.isArray(socialMediaProfiles)) {
            setLinks((prevLinks) =>
              prevLinks.map((link) => {
                const matchedProfile = socialMediaProfiles.find(
                  (profile) => profile.platform === link.platform
                );
                return matchedProfile
                  ? { ...link, url: matchedProfile.link }
                  : link;
              })
            );
          }
          // Directly set accountSettings values here
          if (accountSettings) {
            setEmail(accountSettings.email || "");
            setPhone(accountSettings.phone || "");
            setLocation(accountSettings.location || "");
            setAddress(accountSettings.address || "");
          }
        }
      } catch (error) {
        console.error("Error fetching company data:", error.message);
      }
    };

    fetchCompanyData();
  }, []);

  // File validation function for logo
  const onDropLogo = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setLogo(file);
  };

  // File validation function for banner
  const onDropBanner = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setBanner(file);
  };

  // Use Dropzone hook for logo
  const { getRootProps: getLogoRootProps, getInputProps: getLogoInputProps } =
    useDropzone({
      onDrop: onDropLogo,
      accept: { "image/jpeg, image/png, image/jpg": [] },
      multiple: false,
    });

  // Use Dropzone hook for banner
  const {
    getRootProps: getBannerRootProps,
    getInputProps: getBannerInputProps,
  } = useDropzone({
    onDrop: onDropBanner,
    accept: { "image/jpeg, image/png, image/jpg": [] },
    multiple: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Initialize FormData
    const formData = new FormData();

    // Append files
    if (logo) formData.append("logo", logo);
    if (banner) formData.append("banner", banner);

    // Append other form data as a stringified JSON object
    const companyInfo = {
      companyName: CompanyName,
      aboutUs: aboutUs,
    };
    formData.append("companyInfo", JSON.stringify(companyInfo));

    try {
      // Log FormData for debugging
      formData.forEach((value, key) => {
        console.log(key, value);
      });

      // Send POST request with FormData
      const response = await axios.post(
        "http://localhost:4000/company/company-info",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.success) {
        setActiveTab("Founding Info");
        alert("Company Info Submitted Successfully!");
      } else {
        alert("Failed to submit company info.");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
      } else if (error.request) {
        console.error("Error request:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
    }
  };

  const handleFoundingInfoSubmit = async (e) => {
    e.preventDefault();

    const foundingInfo = {
      foundersName: foundersName,
      organizationType: organizationType,
      industryType: industryType,
      teamSize: teamSize,
      yearOfEstablishment: yearOfEstablishment,
      website: website,
      companyVision: companyVision,
    };

    // Prepare the payload
    const payload = {
      id: id,
      foundingInfo: foundingInfo,
    };

    try {
      // Send POST request with founding info as JSON
      const response = await axios.post(
        "http://localhost:4000/company/founding-info",
        payload, // Send the data directly as JSON
        { headers: { "Content-Type": "application/json" } } // Set content type to JSON
      );
      console.log(response);

      if (response.data.success) {
        setActiveTab("Social Media Profile");
        alert("Founding Info Submitted Successfully!");
      } else {
        alert("Failed to submit founding info.");
      }
    } catch (error) {
      console.error("Error during founding info submission:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
      } else if (error.request) {
        console.error("Error request:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
    }
  };

  const SocialLinksSubmit = async () => {
    const socialMediaProfiles = links.map((link) => ({
      platform: link.platform,
      link: link.url,
    }));

    const payload = {
      id: id,
      socialMediaProfiles,
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/company/social-media",
        payload
      );
      if (response.data.success) {
        setActiveTab("Account Settings");
        alert("Social Media Profiles updated successfully!");
      } else {
        alert("Failed to update profiles: " + response.data.message);
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert("An error occurred. Please try again later.");
    }
  };
  const handleAccountSettingsSubmit = async (e) => {
    e.preventDefault();

    // Prepare the accountSettings payload
    const accountSettings = {
      email: email,
      phone: phone,
      location: location,
      address: address,
    };

    // Prepare the payload to send
    const payload = {
      id: id, // Assuming you have the companyId in the state
      accountSettings: accountSettings,
    };

    try {
      // Send POST request with accountSettings data as JSON
      const response = await axios.post(
        "http://localhost:4000/company/account-settings",
        payload, // Send the data directly as JSON
        { headers: { "Content-Type": "application/json" } } // Set content type to JSON
      );
      console.log(response);

      if (response.data.success) {
        alert("Account Settings Submitted Successfully!");
      } else {
        alert("Failed to submit account settings.");
      }
    } catch (error) {
      console.error("Error during account settings submission:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
      } else if (error.request) {
        console.error("Error request:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
    }
  };

  return (
    <div className="p-2 max-w-4xl mx-auto">
      {/* Tabs */}
      <div className="flex space-x-6 font-bold border-b mb-6">
        {[
          "Company Info",
          "Founding Info",
          "Social Media Profile",
          "Account Settings",
        ].map((tab) => (
          <button
            key={tab}
            className={`pb-2 ${
              activeTab === tab
                ? "border-b-2 border-blue-600 text-blue-600 font-medium"
                : "text-gray-600 hover:text-blue-600"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Render the active tab content */}
      <div>
        {activeTab === "Company Info" && (
          <form onSubmit={handleSubmit}>
            {/* Logo & Banner Drag-and-Drop */}
            <div className="grid grid-cols-3 mb-6">
              {/* Logo Section */}
              <div className="col-span-1 flex flex-col">
                <label className="block text-sm font-medium ml-16 text-gray-700">
                  Upload logo
                </label>
                <div
                  {...getLogoRootProps()}
                  className="border-2 border-dashed text-center text-gray-600 bg-gray-50 w-[200px] h-[200px] flex items-center justify-center"
                >
                  {logo ? (
                    <img
                      src={logo}
                      alt="Logo"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <p>Drag & drop your logo here or click to select</p>
                  )}
                  <input {...getLogoInputProps()} />
                </div>
              </div>

              {/* Banner Section */}
              <div className="col-span-2 flex flex-col items-center">
                <label className="block text-sm font-medium text-gray-700">
                  Upload Banner
                </label>
                <div
                  {...getBannerRootProps()}
                  className="border-2 border-dashed text-center bg-gray-50 text-gray-600 w-full h-[200px] flex items-center justify-center"
                >
                  {banner ? (
                    <img
                      src={banner} 
                      alt="Banner"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <p>Drag & drop your banner here or click to select</p>
                  )}
                  <input {...getBannerInputProps()} />
                </div>
              </div>
            </div>

            {/* Company Name & About Us */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Company Name :
                </label>
                <input
                  type="text"
                  value={CompanyName}
                  readOnly
                  onChange={(e) => {
                    setCompanyName(e.target.value);
                  }}
                  placeholder="Enter company name"
                  className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  About Us :
                </label>
                <textarea
                  rows="5"
                  value={aboutUs}
                  onChange={(e) => {
                    setAboutUs(e.target.value);
                  }}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                  placeholder="Write down about your company here. Let the candidate know who we are..."
                />
              </div>
            </div>
          </form>
        )}

        {activeTab === "Founding Info" && (
          <form onSubmit={handleFoundingInfoSubmit}>
            <div className="grid grid-cols-2 mt-10 gap-6 mb-6">
              {/* Founder Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Founder Name :
                </label>
                <input
                  type="text"
                  value={foundersName}
                  onChange={(e) => {
                    setFoundersName(e.target.value);
                  }}
                  placeholder="Enter founder's name..."
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                />
              </div>
              {/* Organization Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Organization Type :
                </label>
                <select
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                  value={organizationType}
                  onChange={(e) => {
                    setOrganizationType(e.target.value);
                  }}
                >
                  <option value="" disabled>
                    Select...
                  </option>
                  <option value="Private">Private</option>
                  <option value="Public">Public</option>
                </select>
              </div>

              {/* Industry Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Industry Types :
                </label>
                <select
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                  value={industryType}
                  onChange={(e) => {
                    setIndustryType(e.target.value);
                  }}
                >
                  <option value="" disabled>
                    Select...
                  </option>
                  <option value="IT">IT</option>
                  <option value="Manufacturing">Manufacturing</option>
                </select>
              </div>

              {/* Team Size */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Team Size :
                </label>
                <select
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                  value={teamSize}
                  onChange={(e) => {
                    setTeamSize(e.target.value);
                  }}
                >
                  <option value="" disabled>
                    Select...
                  </option>
                  <option value="1-10">1-10</option>
                  <option value="11-50">11-50</option>
                  <option value="51-200">51-200</option>
                </select>
              </div>

              {/* Year of Establishment */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Year of Establishment :
                </label>
                <input
                  type="date"
                  value={yearOfEstablishment} // Value should be in the 'YYYY-MM-DD' format
                  onChange={(e) => {
                    setYearOfEstablishment(e.target.value); // Update the state with the selected date
                  }}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                />
              </div>

              {/* Company Website */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Company Website :
                </label>
                <input
                  type="url"
                  placeholder="Website URL..."
                  value={website}
                  onChange={(e) => {
                    setWebsite(e.target.value);
                  }}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                />
              </div>
            </div>

            {/* Company Vision */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Company Vision :
              </label>
              <textarea
                rows="5"
                value={companyVision}
                onChange={(e) => {
                  setCompanyVision(e.target.value);
                }}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                placeholder="Tell us about your company vision..."
              />
            </div>
          </form>
        )}
        {activeTab === "Social Media Profile" && (
          <div className="w-full mx-auto p-6 bg-white shadow rounded">
            {links.map((link) => (
              <div
                key={link.id}
                className="flex items-center mb-4 space-x-4 border-b pb-2 flex-wrap"
              >
                <div className="text-xl">{link.icon}</div>
                <select
                  value={link.platform}
                  onChange={(e) =>
                    handlePlatformChange(link.id, e.target.value)
                  }
                  className="border rounded px-2 py-1 w-full sm:w-auto"
                >
                  <option value="Select">Select</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Twitter">Twitter</option>
                  <option value="Instagram">Instagram</option>
                  <option value="YouTube">YouTube</option>
                </select>
                <input
                  type="text"
                  value={link.url}
                  onChange={(e) => handleInputChange(link.id, e.target.value)}
                  placeholder="Profile link/url..."
                  className="flex-1 border rounded px-2 py-1 mt-2 sm:mt-0"
                />
              </div>
            ))}
          </div>
        )}

        {activeTab === "Account Settings" && (
          <form className="space-y-4 ">
            <div>
              <label className="block font-semibold text-gray-600">
                Map Location :
              </label>
              <input
                type="text"
                name="location"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
                placeholder="Enter Your Company location URL"
                className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-600">
                Phone :
              </label>
              <div className="flex mt-1 focus:ring-blue-400">
                <select className="border rounded-l-md px-3 py-2 focus:ring-blue-400 bg-gray-50">
                  <option>+91</option>
                  <option>+880</option>
                  <option>+1</option>
                </select>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  placeholder="Phone number.."
                  className="w-full border rounded-r-md px-3 py-2 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-gray-600">
                Email :
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Email address"
                className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Company Address :
              </label>
              <textarea
                rows="5"
                name="address"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                placeholder="Write Your Company Address...."
              />
            </div>
          </form>
        )}
      </div>

      {/* Navigation Buttons */}
      <div
        className={`flex ${
          activeTab === "Company Info" ? "justify-end" : "justify-between"
        } mt-6`}
      >
        {/* Render Previous Button on All Pages Except Company Info */}
        {activeTab !== "Company Info" && (
          <button
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300"
            onClick={handlePrevious} // Implement handlePrevious for navigation
          >
            Previous
          </button>
        )}

        {/* Conditional Save & Next Button */}
        {activeTab === "Founding Info" ? (
          <button
            type="button"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
            onClick={handleFoundingInfoSubmit}
          >
            Save & Next
          </button>
        ) : activeTab === "Company Info" ? (
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
            onClick={handleSubmit}
          >
            Save & Next
          </button>
        ) : activeTab === "Social Media Profile" ? (
          <button
            type="button"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
            onClick={SocialLinksSubmit} // Add specific handler for Social Media tab
          >
            Save & Next
          </button>
        ) : activeTab === "Account Settings" ? (
          <button
            type="button"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
            onClick={handleAccountSettingsSubmit} // Add the handler for Account Settings
          >
            Finish Editing
          </button>
        ) : (
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md">
            {activeTab === "Account Settings"
              ? "Finish Editing"
              : "Save & Next"}
          </button>
        )}
      </div>
    </div>
  );
};

export default CompanyInfo;
