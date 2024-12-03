import React, { useState} from "react";
import { useDropzone } from "react-dropzone";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { TbWorld } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import axios from "axios";
import SocialLinks from "./SocialLinks";
import AccountSettings from "./AccountSettings"

const SettingsPage = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [activeTab, setActiveTab] = useState("personal");
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState('');


  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    gender: "",
    age: "",
    phone: "",
    email: "",
    maritalStatus: "",
    address: "",
    qualificationInput: "",
    jobRole: "",
    experience: "",
    nationality: "",
    graduationYear: "",
    resume: "",
    skills: "",
    areaOfInterest: "",
  });

  // useEffect(() => {
  //   const getUserDetails = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:4000/user/getuserdetails', {
  //         headers: {
  //           'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming you're using a token for auth
  //         },
  //       });
  //       // If response is successful, update the form data
  //       const data = response.data;
        
  //       setFormData((prevFormData) => ({
  //         ...prevFormData,
  //         fullName: data.username || "", // Update with data if it exists
  //         phone: data.phone || "",       // Update with data if it exists
  //         email: data.email || "",       // Ensure email is also updated
  //       }));
  //       setLoading(false);
  //     } catch (error) {
  //       setError('Error fetching user details');
  //       setLoading(false);
  //     }
  //   };

  //   // Call the function when the component mounts
  //   getUserDetails();
  // }, []);

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Client-side validation
    if (
      !formData.fullName ||
      !formData.dob ||
      !formData.gender ||
      !formData.phone ||
      !formData.email ||
      !formData.maritalStatus ||
      !formData.address ||
      !formData.qualificationInput ||
      !formData.skills ||
      !formData.jobRole ||
      !formData.areaOfInterest ||
      !formData.experience ||
      !formData.nationality ||
      !formData.graduationYear ||
      !formData.resume
    ) {
      alert("Please fill out all required fields!");
      return;
    }
  
    console.log("Form Data:", formData);
  
    // Send form data to the server
    try {
      const response = await axios.post(
        "http://localhost:4000/userp/create-profile", // API endpoint
        formData, // Send form data as JSON
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      console.log("Profile saved successfully:", response.data);
      alert("Profile saved successfully!");
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
  
      if (errorMessage.includes("Email already in use")) {
        alert("The provided email is already associated with another account.");
      } else {
        alert(`Failed to save profile: ${errorMessage}`);
      }
      console.error("Error saving profile:", error.response?.data || error.message);
    }
  };
  
  // Handle drag-and-drop or manual file selection for profile picture
  const onDropProfile = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const previewURL = URL.createObjectURL(file);
    setProfilePicture(previewURL);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    maxFiles: 1,
    onDrop: onDropProfile,
  });
  
  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>{error}</div>;
  // }

  return (
    <div className="p-6 bg-gray-100 h-screen">
      <div className="bg-white rounded-lg shadow-md p-8">
       

        {/* Header Section with Tabs */}
        <div className="mb-6">
          <div className="flex space-x-6">
            <Link
              to="#"
              className={`text-lg font-medium ${
                activeTab === "personal"
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("personal")}
            >
              <CgProfile className="inline-block mr-2 mb-1" size={20} />
              Profile
            </Link>
            <Link
              to="#"
              className={`text-lg font-medium ${
                activeTab === "social"
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("social")}
            >
              <TbWorld className="inline-block mr-2 mb-1 " size={22} />
              Social Links
            </Link>
            <Link
              to="#"
              className={`text-lg font-medium ${
                activeTab === "account"
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("account")}
            >
              <IoSettingsOutline
                className="inline-block mr-2 mb-1 "
                size={20}
              />
              Account Settings
            </Link>
          </div>
        </div>

        {activeTab === "social" && (
          <div>
           
            <SocialLinks/> {/* Render SocialLinks component */}
          </div>
        )}
         {activeTab === "account" && (
        <div>
        
          <AccountSettings /> {/* Render AccountSettings component */}
        </div>
      )}

        {/* Tab Content */}
        <div>
          {/* Personal Information Section */}
          {activeTab === "personal" && (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* Profile Picture Section (1st Column) */}
                <div className="col-span-1 justify-center items-center">
                  <label className="block text-gray-600 mb-2">
                    Profile Picture
                  </label>
                  <div
                    {...getRootProps()}
                    className="border-dashed bg-gray-200 border-2 border-gray-300 rounded-md w-52 h-52 text-center cursor-pointer flex flex-col items-center justify-center relative"
                  >
                    <input {...getInputProps()} />
                    {profilePicture ? (
                      <div className="relative">
                        <img
                          src={profilePicture}
                          alt="Profile Preview"
                          className="w-52 h-52 object-cover rounded-full"
                        />
                        <button
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            setProfilePicture(null); // Clear preview
                            setFormData({ ...formData, profilePicture: null }); // Clear formData
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <div>
                        <FaCloudDownloadAlt className="text-3xl mx-auto my-auto text-blue-500 mb-2" />
                        <p className="text-gray-500 mt-5">
                          Drag & drop a photo or click to browse
                        </p>
                        <p className="text-gray-400 text-sm">
                          Max photo size 5 MB
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Personal Information (2nd Column) */}
                <div className="col-span-1 space-y-2">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block mt-1 text-sm font-medium text-gray-700"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label
                      htmlFor="dob"
                      className="block mt-1 text-sm font-medium text-gray-700"
                    >
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      id="dob"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Gender */}
                  <div>
                    <label
                      htmlFor="gender"
                      className="block mt-1 text-sm font-medium text-gray-700"
                    >
                      Gender
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Age */}
                  <div>
                    <label
                      htmlFor="age"
                      className="block mt-1 text-sm font-medium text-gray-700"
                    >
                      Age
                    </label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      placeholder="e.g 24"
                      className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block mt-1 text-sm font-medium text-gray-700"
                    >
                      Phone Number
                    </label>
                    <input
                      type="number"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Your phone number"
                      className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-5001"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block mt-1 text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="example@example.com"
                      className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Marital Status */}
                  <div>
                    <label
                      htmlFor="maritalStatus"
                      className="block mt-1 text-sm font-medium text-gray-700"
                    >
                      Marital Status
                    </label>
                    <select
                      id="maritalStatus"
                      name="maritalStatus"
                      value={formData.maritalStatus}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option>Select...</option>
                      <option value="single">Single</option>
                      <option value="married">Married</option>
                    </select>
                  </div>

                  {/* Address */}
                  <div>
                    <label
                      htmlFor="address"
                      className="block mt-1 text-sm font-medium text-gray-700"
                    >
                      Address
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      rows="3"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter your Address"
                      className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Additional Details (3rd Column) */}
                <div className="col-span-1 space-y-2">
                  {/* Education */}
                  <div>
                    <label className="block mt-1 text-sm font-medium text-gray-700">
                      Education
                    </label>
                    <input
                      type="text"
                      value={formData.qualificationInput} // Ensure it's controlled
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          qualificationInput: e.target.value,
                        })
                      }
                      placeholder="Search...."
                      className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  {/* Skills */}
                  <div>
                    <label className="block mt-1 text-sm font-medium text-gray-700">
                      Skills
                    </label>
                    <input
                      type="text"
                      id="skills"
                      name="skills"
                      value={formData.skills} // Ensure it's controlled
                      onChange={(e) =>
                        setFormData({ ...formData, skills: e.target.value })
                      }
                      placeholder="e.g., JavaScript, React, Python"
                      className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Graduation Year */}
                  <div>
                    <label
                      htmlFor="graduationYear"
                      className="block mt-1 text-sm font-medium text-gray-700"
                    >
                      Graduation Year
                    </label>
                    <input
                      type="number"
                      id="graduationYear"
                      name="graduationYear"
                      value={formData.graduationYear}
                      onChange={handleChange}
                      placeholder="e.g 2024"
                      className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Nationality */}
                  <div>
                    <label
                      htmlFor="nationality"
                      className="block mt-1 text-sm font-medium text-gray-700"
                    >
                      Nationality
                    </label>
                    <input
                      type="text"
                      id="nationality"
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleChange}
                      placeholder="e.g Indian"
                      className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* job role */}
                  <div>
                    <label
                      htmlFor="areaOfInterest"
                      className="block mt-1 text-sm font-medium text-gray-700"
                    >
                      Job Role
                    </label>
                    <input
                      type="text"
                      id="jobRole"
                      name="jobRole" // Consistent name
                      value={formData.jobRole}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your job role"
                    />
                  </div>

                  {/* Resume Upload */}
                  <div>
                    <label
                      htmlFor="resume"
                      className="block mt-1 text-sm font-medium text-gray-700"
                    >
                      Resume (PDF Only)
                    </label>
                    <input
                      type="file"
                      id="resume"
                      name="resume"
                      accept="application/pdf"
                      onChange={(e) =>
                        setFormData({ ...formData, resume: e.target.files[0] })
                      }
                      className="w-full border border-gray-300 rounded-md p-2 mt-1"
                    />
                  </div>

                  {/* Experience */}
                  <div>
                    <label
                      htmlFor="experience"
                      className="block mt-1 text-sm font-medium text-gray-700"
                    >
                      Experience
                    </label>
                    <input
                      type="number"
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      placeholder="Enter your Experience"
                      className="w-full border border-gray-300 rounded-md p-2 mt-1"
                    />
                  </div>

                  {/* area of interest */}
                  <div>
                    <label
                      htmlFor="areaOfIntrest"
                      className="block mt-1 text-sm font-medium text-gray-700"
                    >
                      Area of Interest
                    </label>
                    <textarea
                      id="areaOfInterest"
                      name="areaOfInterest"
                      rows="3"
                      value={formData.areaOfInterest} // Ensure it's controlled
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          areaOfInterest: e.target.value,
                        })
                      }
                      placeholder="Describe your area of interest"
                      className="w-full border border-gray-300 rounded-md p-2 mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-8">
                <button className="bg-blue-500 ml-96 text-white px-6 py-2 rounded-md hover:bg-blue-600">
                  Save Changes
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
