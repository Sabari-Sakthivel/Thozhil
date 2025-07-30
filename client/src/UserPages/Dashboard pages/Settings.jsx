import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { TbWorld } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import axios from "axios";
import SocialLinks from "./SocialLinks";
import AccountSettings from "./AccountSettings";
import { format } from "date-fns";

const SettingsPage = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [activeTab, setActiveTab] = useState("personal");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
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
    resume: null,
    skills: "",
    areaOfInterest: "",
    profilePicture: "",
  });

  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/user/getuserdetails",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token for authentication
            },
          }
        );

        if (response.status === 200) {
          const data = response.data;

          const profilePicPath = data.profilePicture
            ? `http://localhost:4000/${data.profilePicture.replace(/\\/g, "/")}`
            : null;

          setProfilePicture(profilePicPath); // <- key update here!

          // Update form data with user profile and resume
          setFormData((prevFormData) => ({
            ...prevFormData,
            username: data.username || "",
            phone: data.phone || "",
            email: data.email || "",
            dob: data.dob ? format(new Date(data.dob), "dd/MM/yyyy") : "",
            age: data.age || "",
            gender: data.gender || "",
            maritalStatus: data.maritalStatus || "",
            address: data.address || "",
            qualificationInput: data.qualificationInput || "",
            jobRole: data.jobRole || "",
            experience: data.experience || "",
            nationality: data.nationality || "",
            graduationYear: data.graduationYear || "",
            resume: data.resume || null, // Ensure resume is handled properly
            profilePicture: data.profilePicture || "", // Handle profile picture
            skills: data.skills || "",
            areaOfInterest: data.areaOfInterest || "",
          }));
          setLoading(false);
        } else {
          setError("Failed to fetch user details.");
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Error fetching user details.";
        setError(errorMessage);
        console.error(error);
      } finally {
        setLoading(false); // Always set loading to false
      }
    };

    fetchUserDetails();
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the profile is incomplete (based on required fields)
    const requiredFields = [
      "dob",
      "gender",
      "maritalStatus",
      "address",
      "qualificationInput",
      "skills",
      "jobRole",
      "areaOfInterest",
      "experience",
      "nationality",
      "graduationYear",
    ];

    const isProfileIncomplete = requiredFields.some(
      (field) => !formData[field]
    );

    if (isProfileIncomplete) {
      alert("Please fill out all required fields for the first time.");
      return;
    }

    try {
      // Prepare FormData for form fields (excluding resume logic)
      const formDataToSubmit = new FormData();

      // Append form fields (excluding resume if not in edit mode)
      for (const [key, value] of Object.entries(formData)) {
        if ((key === "resume" || key === "profilePicture") && value) {
          formDataToSubmit.append(key, value); // Append files
        } else if (key !== "resume" && key !== "profilePicture") {
          formDataToSubmit.append(key, value);
        }
      }
      // Send the FormData object
      const response = await axios.put(
        "http://localhost:4000/user/update-profile",
        formDataToSubmit,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data", // Required for file uploads
          },
        }
      );

      alert(response.data.message);
      setIsModalOpen(false); // Disable edit mode
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      alert(`Failed to update profile: ${errorMessage}`);
      console.error(errorMessage);
    }
  };

  const handleEdit = () => {
    setIsModalOpen(true);
    setEditMode(true); // Open the modal
  };

  // Handle drag-and-drop or manual file selection for profile picture
  const onDropProfile = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const previewURL = URL.createObjectURL(file);
    setProfilePicture(previewURL);
    setFormData((prevFormData) => ({
      ...prevFormData,
      profilePicture: file,
    }));
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    maxFiles: 1,
    onDrop: onDropProfile,
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const getResumeName = (filePath) => {
    if (typeof filePath === "string" && filePath) {
      const parts = filePath.split("-");
      return parts.length > 1 ? parts.slice(1).join("-") : filePath; // Join back parts after the first one, if present
    }
    return ""; // Return an empty string if filePath is not a valid string
  };

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
            <SocialLinks /> {/* Render SocialLinks component */}
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
                {/* Profile Picture Section (1st Column) */}
                <div className="col-span-1 flex flex-col justify-center items-center">
                  <label className="block text-gray-600 mb-2">
                    Profile Picture
                  </label>
                  <div
                    {...getRootProps()}
                    className={`border-dashed bg-gray-200 border-2 border-gray-300 rounded-md w-52 h-52 cursor-pointer flex items-center justify-center relative ${
                      !editMode ? "cursor-not-allowed opacity-60" : ""
                    }`}
                  >
                    <input {...getInputProps()} disabled={!editMode} />

                    {profilePicture ? (
                      <div className="relative w-52 h-52">
                        <img
                          src={profilePicture}
                          alt="Profile Preview"
                          className="w-52 h-52 object-cover rounded-full"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/default-avatar.png"; // Optional: set a default avatar image
                          }}
                        />
                        {editMode && (
                          <button
                            type="button"
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
                            onClick={(e) => {
                              e.stopPropagation();
                              setProfilePicture(null);
                              setFormData((prev) => ({
                                ...prev,
                                profilePicture: null,
                              }));
                            }}
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="text-center px-2">
                        <FaCloudDownloadAlt className="text-3xl text-blue-500 mb-2" />
                        <p className="text-gray-500">
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
                      htmlFor="username"
                      className="block mt-1 text-sm font-medium text-gray-700"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      disabled={!editMode}
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
                      type="text"
                      id="dob"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      disabled={!editMode}
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
                      disabled={!editMode}
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
                      disabled={!editMode}
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
                      disabled={!editMode}
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
                      disabled={!editMode}
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
                      disabled={!editMode}
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
                      disabled={!editMode}
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
                      disabled={!editMode}
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
                      disabled={!editMode}
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
                      disabled={!editMode}
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
                      disabled={!editMode}
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
                      disabled={!editMode}
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
                      type="text"
                      id="resume"
                      name="resume"
                      accept="application/pdf"
                      value={getResumeName(formData.resume)}
                      disabled={!editMode} // Disable when not in edit mode
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          resume: e.target.files[0], // Set the file to formData
                        })
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
                      disabled={!editMode}
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
                      disabled={!editMode}
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

                <button
                  type="button"
                  className="bg-yellow-500 ml-20 text-white px-6 py-2 rounded-md hover:bg-yellow-600"
                  onClick={handleEdit}
                >
                  Edit Profile
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto">
            <div
              className="bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4 text-center">
                Edit Profile
              </h2>
              <form onSubmit={handleSubmit}>
                <div
                  className="grid grid-cols-1 sm:grid-cols-3 gap-6 overflow-y-auto max-h-[70vh] px-4 pb-4"
                  style={{ paddingBottom: "16px" }}
                >
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
                              setFormData({
                                ...formData,
                                profilePicture: null,
                              }); // Clear formData
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
                        htmlFor="username"
                        className="block mt-1 text-sm font-medium text-gray-700"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
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
                        type="text"
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
                        disabled={true}
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
                        // value={getResumeName(formData.resume)}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            resume: e.target.files[0],
                          })
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

                {/* Actions */}
                <div className="flex justify-end mt-6">
                  <button
                    type="button"
                    className="bg-gray-300 text-black px-4 py-2 rounded-md mr-2"
                    onClick={() => setIsModalOpen(false)} // Close modal
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
