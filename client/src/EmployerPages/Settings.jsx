import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useParams } from "react-router-dom";

import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import axios from "axios";

const CompanyInfo = () => {
  const [activeTab, setActiveTab] = useState("Company Info");
  const [socialLinks, setSocialLinks] = useState([
    {
      id: 1,
      platform: "Facebook",
      url: "",
      icon: <FaFacebook className="text-blue-500" />,
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
      platform: "LinkedIn",
      url: "",
      icon: <FaLinkedin className="text-blue-500" />,
    },
    {
      id: 5,
      platform: "Youtube",
      url: "",
      icon: <FaYoutube className="text-red-500" />,
    },
  ]);
  const [logo, setLogo] = useState(null);
  const [banner, setBanner] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const [aboutUs, setAboutUs] = useState("");
  const { companyId } = useParams();
  console.log(companyId);
  
  

  // const [foundingInfo, setFoundingInfo] = useState({
  //   founderName: "",
  //   organizationType: "",
  //   industryType: "",
  //   teamSize: "",
  //   yearOfEstablishment: "",
  //   website: "",
  //   companyVision: "",
  // });

  const handleAddSocialLink = () => {
    setSocialLinks([
      ...socialLinks,
      { id: socialLinks.length + 1, platform: "", url: "", icon: null },
    ]);
  };

  const handleSocialLinkChange = (id, platform) => {
    setSocialLinks(
      socialLinks.map((link) =>
        link.id === id
          ? { ...link, platform, icon: getPlatformIcon(platform) }
          : link
      )
    );
  };

  const handleRemoveSocialLink = (id) => {
    setSocialLinks(socialLinks.filter((link) => link.id !== id));
  };
  const getPlatformIcon = (platform) => {
    switch (platform) {
      case "Facebook":
        return <FaFacebook />;
      case "Twitter":
        return <FaTwitter />;
      case "Instagram":
        return <FaInstagram />;
      case "LinkedIn":
        return <FaLinkedin />;
      case "YouTube":
        return <FaYoutube />;
      default:
        return null;
    }
  };
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
const { getRootProps: getLogoRootProps, getInputProps: getLogoInputProps } = useDropzone({
  onDrop: onDropLogo,
  accept: {"image/jpeg, image/png, image/jpg": [] }, 
  multiple: false, 
});

// Use Dropzone hook for banner
const { getRootProps: getBannerRootProps, getInputProps: getBannerInputProps } = useDropzone({
  onDrop: onDropBanner,
  accept: {"image/jpeg, image/png, image/jpg": [] },
  multiple: false, 
});
useEffect(() => {
  if (activeTab === "Company Info" && companyId) {
    console.log(companyId);
    // Fetch company data when the active tab is "Company Info" and companyId exists
    const fetchCompanyData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/company/${companyId}`);
        console.log(response)
        
        if (response.data.success) {
          const data = response.data.company;

          if (data) {
            setCompanyName(data.companyInfo.companyName || "");
            setAboutUs(data.companyInfo.aboutUs || "");
            setLogo(data.companyInfo.logo || null);
            setBanner(data.companyInfo.bannerImage || null);
          }
        } else {
          console.error("No company data found:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching company data:", error.response ? error.response.data.message : error.message);
      }
    };

    fetchCompanyData(); // Call the function to fetch data
  }
}, [activeTab, companyId]);


  // useEffect(() => {
  //   const fetchCompanyData = async () => {
  //     try {
  //       console.log("Fetching data for companyId:", companyId);
  //       const response = await axios.get(
  //         `http://localhost:4000/company/${companyId}`, { timeout: 5000 }
  //       );
  //       console.log("API Response:", response);

  //       if (response.data.success) {
  //         setCompany(response.data.company);
  //       } else {
  //         setError(response.data.message);
  //       }
  //     } catch (err) {
  //       console.error("Error fetching company data:", err);
  //       setError("An error occurred while fetching company data.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (companyId) {
  //     fetchCompanyData();
  //   }
  // }, [companyId]);

  // if (loading) return <div>Loading...</div>;

  // if (error) return <div>Error: {error}</div>;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Initialize FormData
    const formData = new FormData();

    // Append files
    if (logo) formData.append("logo", logo);
    if (banner) formData.append("banner", banner);

    const companyInfo = {
      companyName: companyName,
      aboutUs: aboutUs,
    };
    // Append companyInfo as a stringified object
    formData.append("companyInfo", JSON.stringify(companyInfo));

    try {
      // Log FormData for debugging
      formData.forEach((value, key) => {
        console.log(key, value);
      });

      // Send request
      const response = await axios.post(
        "http://localhost:4000/company/company-info",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (response.data.success) {
        setActiveTab("Founding Info");
        alert("Company Info Submitted Successfully!");
      } else {
        alert("Failed to submit company info.");
      }
    } catch (error) {
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
          "Contact",
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
                <label className="block text-sm font-medium ml-20 text-gray-700">
                  Logo
                </label>
                <div
                  {...getLogoRootProps()}
                  className="border-2 border-dashed text-center text-gray-600 bg-gray-50 w-[200px] h-[200px] flex items-center justify-center"
                >
                  {logo ? (
                    <img
                      src={URL.createObjectURL(logo)}
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
                  Banner
                </label>
                <div
                  {...getBannerRootProps()}
                  className="border-2 border-dashed text-center bg-gray-50 text-gray-600 w-full h-[200px] flex items-center justify-center"
                >
                  {banner ? (
                    <img
                      src={URL.createObjectURL(banner)} // Use createObjectURL to display the image
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
                  value={companyName}
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
          <div>
            <div className="grid grid-cols-2 mt-10 gap-6 mb-6">
              {/* Founder Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Founder Name :
                </label>
                <input
                  type="text"
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
                  defaultValue=""
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
                  defaultValue=""
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
                  defaultValue=""
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
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                placeholder="Tell us about your company vision..."
              />
            </div>
          </div>
        )}
        {activeTab === "Social Media Profile" && (
          <div>
            <div className="space-y-4 mb-6 mt-14">
              {socialLinks.map((link) => (
                <div key={link.id} className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 w-auto">
                    {/* Custom dropdown with icon */}
                    <div className="relative">
                      <select
                        value={link.platform}
                        onChange={(e) =>
                          handleSocialLinkChange(link.id, e.target.value)
                        }
                        className="block w-auto border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 pl-10"
                      >
                        <option value="Facebook">
                          {" "}
                          <FaFacebook /> Facebook
                        </option>
                        <option value="Twitter">Twitter</option>
                        <option value="Instagram">Instagram</option>
                        <option value="LinkedIn">LinkedIn</option>
                        <option value="YouTube">YouTube</option>
                      </select>
                      {/* Icon placement inside the select */}
                      {link.platform && (
                        <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-xl ">
                          {link.icon}
                        </div>
                      )}
                    </div>
                  </div>

                  <input
                    type="url"
                    value={link.url}
                    onChange={(e) =>
                      handleSocialLinkChange(link.id, "url", e.target.value)
                    }
                    placeholder="Profile link/url..."
                    className="block w-2/3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                  />

                  <button
                    onClick={() => handleRemoveSocialLink(link.id)}
                    className="text-red-500 border px-2 border-gray-300 rounded-md hover:text-white py-1 hover:bg-red-400 text-lg mt-2 sm:mt-0"
                  >
                    ✖
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={handleAddSocialLink}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              + Add New Social Link
            </button>
          </div>
        )}

        {activeTab === "Contact" && (
          <form className="space-y-4">
            <div>
              <label className="block font-semibold text-gray-600">
                Map Location :
              </label>
              <input
                type="text"
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
                  <option>+880</option>
                  <option>+91</option>
                  <option>+1</option>
                </select>
                <input
                  type="text"
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
          <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300">
            Previous
          </button>
        )}
        {activeTab === "Company Info" ? (
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
            onClick={handleSubmit} // Trigger handleSubmit for Company Info
          >
            Save & Next
          </button>
        ) : (
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md">
            {activeTab === "Contact" ? "Finish Editing" : "Save & Next"}
          </button>
        )}
      </div>
    </div>
  );
};

export default CompanyInfo;
