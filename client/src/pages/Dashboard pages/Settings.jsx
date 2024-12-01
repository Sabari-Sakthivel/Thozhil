import React, { useState,useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { TbWorld } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { useAuth } from "../contextApi/AuthContext";

const SettingsPage = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [activeTab, setActiveTab] = useState("personal");
  const [qualificationInput, setQualificationInput] = useState("");
  const [filteredQualifications, setFilteredQualifications] = useState([]);
  const { user, setUser } = useAuth();
  
  // Initialize the form state with user data from context or default empty object
  const [formsaveData, setFormsaveData] = useState(user || {});

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
    skills: "",
    areaOfInterest: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Sync formData with formsaveData if needed
    setFormData((prev) => ({
      ...prev,
      ...formsaveData
    }));
  }, [formsaveData]); // Triggered whenever formsaveData changes

  const handleChangeFData = (e) => {
    const { name, value } = e.target;
    setFormsaveData((prev) => ({
      ...prev,
      [name]: value, // Updates formsaveData
    }));
  };
  const handlesavedata = () => {
    setUser(formsaveData); // Save to user context
    localStorage.setItem("user", JSON.stringify(formsaveData)); // Persist in localStorage
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate the input change if needed
    validateInput(name, value);
  };

  const validateInput = (name, value) => {
    let error = "";

    switch (name) {
      case "fullName":
        if (!/^[a-zA-Z\s]+$/.test(value)) {
          error = "Full name must contain only letters and spaces.";
        }
        break;

      case "dob":
        if (!value) {
          error = "Date of birth is required.";
        } else if (
          !/^\d{4}$/.test(value) ||
          value < 1900 ||
          value > new Date().getFullYear()
        ) {
          error = "Enter a valid year ";
        }
        break;

      case "phone":
        if (!/^\d{10}$/.test(value)) {
          error = "Phone number must be 10 digits.";
        }
        break;

      case "email":
        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
          error = "Enter a valid email address.";
        }
        break;

      case "age":
        if (value < 1 || value > 120) {
          error = "Age must be between 1 and 120.";
        }
        break;

      case "graduationYear":
        const currentYear = new Date().getFullYear();
        if (value < 1900 || value > currentYear) {
          error = `Graduation year must be between 1900 and ${currentYear}.`;
        }
        break;

      case "skills":
        if (value && value.length < 3) {
          error = "Skills must have at least 3 characters.";
        }
        break;

      case "address":
      case "areaOfInterest":
        if (value.length < 5) {
          error = `${
            name === "address" ? "Address" : "Area of Interest"
          } must be at least 5 characters.`;
        }
        break;

      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  function validateFile(event) {
    const file = event.target.files[0];
    const errorMessage = document.getElementById("error-message");
    if (file) {
      const allowedExtensions = ["pdf", "doc", "docx"];
      const fileExtension = file.name.split(".").pop().toLowerCase();

      if (!allowedExtensions.includes(fileExtension)) {
        errorMessage.textContent =
          "Only .pdf, .doc, or .docx files are allowed.";
        errorMessage.classList.remove("hidden");
        event.target.value = ""; // Clear the invalid file
      } else {
        errorMessage.textContent = "";
        errorMessage.classList.add("hidden");
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure all fields are validated
    let formIsValid = true;
    Object.keys(formData).forEach((key) => {
      validateInput(key, formData[key]);
      if (errors[key]) formIsValid = false;
    });

    if (formIsValid) {
      console.log("Form Submitted", formData);
    } else {
      console.log("Validation Errors", errors);
    }
  };

  //qualifications Options.....

  const qualifications = [
    "Bachelor of Science (B.Sc.)",
    "Bachelor of Commerce (B.Com.)",
    "Bachelor of Arts (B.A.)",
    "Master of Science (M.Sc.)",
    "Master of Commerce (M.Com.)",
    "Master of Computer Applications (MCA)",
    "Doctor of Philosophy (Ph.D.)",
    "Diploma in Computer Applications (DCA)",
  ];

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

  const handleQualificationChange = (e) => {
    const value = e.target.value;
    setQualificationInput(value);

    const suggestions = qualifications.filter()((q) => {
      q.toLowerCase().includes(value.toLowerCase());
    });
    setFilteredQualifications(suggestions.length > 0 ? suggestions : ["None"]);
  };

  const handleSuggestionClick = (suggestion) => {
    if (suggestion !== "None") {
      setQualificationInput(suggestion);
    }
    setFilteredQualifications([]); //close suggestions dropdown
  };

  return (
    <div className="p-6 bg-gray-100 h-screen">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-semibold mb-6">Settings</h1>

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
                            setProfilePicture(null);
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
                      onChange={(e) => {
                        handleChange(e);
                        handleChangeFData(e);
                      }}
                      value={formData.fullName}
                      
                      
                      placeholder="Enter your name"
                      className="w-full border border-gray-300 rounded-md p-2 mt-1"
                    />
                    {errors.fullName && (
                      <p className="text-sm text-red-600">{errors.fullName}</p>
                    )}
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
                      className="w-full border border-gray-300 rounded-md p-2 mt-1"
                    />
                    {errors.dob && (
                      <p className="text-sm text-red-600">{errors.dob}</p>
                    )}
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
                      className="w-full border border-gray-300 rounded-md p-2 mt-1"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.gender && (
                      <p className="text-sm text-red-600">{errors.gender}</p>
                    )}
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
                      onChange={(e) => {
                        handleChange(e); // Update formData
                        handleChangeFData(e); // Update formsaveData
                      }}
                      placeholder="e.g 24"
                      className="w-full border border-gray-300 rounded-md p-2 mt-1"
                    />
                    {errors.age && (
                      <p className="text-sm text-red-600">{errors.age}</p>
                    )}
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
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Your phone number"
                      className="w-full border border-gray-300 rounded-md p-2 mt-1"
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-600">{errors.phone}</p>
                    )}
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
                      onChange={(e) => {
                        handleChange(e); // Update formData
                        handleChangeFData(e); // Update formsaveData
                      }}
                      placeholder="example123@gmail.com"
                      className="w-full border border-gray-300 rounded-md p-2 mt-1"
                    />
                    {errors.email && (
                      <p className="text-sm text-red-600">{errors.email}</p>
                    )}
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
                      className="w-full border border-gray-300 rounded-md p-2 mt-1"
                    >
                      <option>Select...</option>
                      <option value="single">Single</option>
                      <option value="married">Married</option>
                    </select>
                    {errors.maritalStatus && (
                      <p className="text-sm text-red-600">
                        {errors.maritalStatus}
                      </p>
                    )}
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
                      placeholder="Enter your Address..."
                      className="w-full border border-gray-300 rounded-md p-2 mt-1"
                    ></textarea>
                    {errors.address && (
                      <p className="text-sm text-red-600">{errors.address}</p>
                    )}
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
                      value={qualificationInput}
                      onChange={handleQualificationChange}
                      placeholder="Search...."
                      className="w-full border border-gray-300 rounded-md p-2 mt-1"
                    />
                    {filteredQualifications.length > 0 && (
                      <ul className="border border-gray-300 rounded mt-1 bg-white max-h-40 overflow-y-auto">
                        {filteredQualifications.map((q, index) => (
                          <li
                            key={index}
                            className={`p-2 cursor-pointer ${
                              q === "None"
                                ? "text-gray-500 cursor-not-allowed"
                                : "hover:bg-indigo-100"
                            }`}
                            onClick={() => handleSuggestionClick(q)}
                          >
                            {q}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  {/* Skills */}
                  <div>
                    <label className="block mt-1 text-sm font-medium text-gray-700">
                      Skills
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., JavaScript, React, Python"
                      value={formData.skills}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md p-2 mt-1"
                    />
                    {errors.skills && (
                      <p className="text-sm text-red-600">{errors.skills}</p>
                    )}
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
                      className="w-full border border-gray-300 rounded-md p-2 mt-1"
                    />
                    {errors.graduationYear && (
                      <p className="text-sm text-red-600">
                        {errors.graduationYear}
                      </p>
                    )}
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
                      className="w-full border border-gray-300 rounded-md p-2 mt-1"
                    />
                    {errors.nationality && (
                      <p className="text-sm text-red-600">
                        {errors.nationality}
                      </p>
                    )}
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
                      id="jobrole"
                      name="jobrole"
                      value={formData.jobRole}
                      onChange={handleChange}
                      placeholder="e.g Web Development"
                      className="w-full border border-gray-300 rounded-md p-2 mt-1"
                    />
                    {errors.jobRole && (
                      <p className="text-sm text-red-600">{errors.jobRole}</p>
                    )}
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
                      onChange={validateFile}
                      className="w-full border border-gray-300 rounded-md p-2 mt-1"
                    />
                    {errors.resume && (
                      <p className="text-sm text-red-600">{errors.resume}</p>
                    )}
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
                      placeholder="Enter your Experience "
                      className="w-full border border-gray-300 rounded-md p-2 mt-1"
                    ></input>
                    {errors.experience && (
                      <p className="text-sm text-red-600">
                        {errors.experience}
                      </p>
                    )}
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
                      type="text"
                      id="areaOfInterest"
                      name="areaOfinterest"
                      rows="3"
                      placeholder="Describe Your area of interest"
                      value={formData.areaOfInterest}
                      onChange={handleChange}
                      
                      className="w-full border border-gray-300 rounded-md p-2 mt-1"
                    />
                    {errors.areaOfInterest && (
                      <p className="text-sm text-red-600">
                        {errors.areaOfInterest}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-8">
                <button
                 className="bg-blue-500 ml-96 text-white px-6 py-2 rounded-md hover:bg-blue-600">
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
