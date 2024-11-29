import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { TbWorld } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";

const SettingsPage = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [activeTab, setActiveTab] = useState("personal");
  const [qualificationInput,setQualificationInput]=useState('');
  const [filteredQualifications,setFilteredQualifications]=useState([]);

  //qualifications Options.....


  const qualifications=[
    "Bachelor of Science (B.Sc.)",
    "Bachelor of Commerce (B.Com.)",
    "Bachelor of Arts (B.A.)",
    "Master of Science (M.Sc.)",
    "Master of Commerce (M.Com.)",
    "Master of Computer Applications (MCA)",
    "Doctor of Philosophy (Ph.D.)",
    "Diploma in Computer Applications (DCA)",
  ]

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
  
  const handleQualificationChange = (e) =>{
    const value = e.target.value;
    setQualificationInput(value);
 
const suggestions = qualifications.filter()((q) =>{
  q.toLowerCase().includes(value.toLowerCase())
});
setFilteredQualifications(suggestions.length > 0 ? suggestions : ["None"])

};

const handleSuggestionClick = (suggestion) =>{
  if (suggestion !== "None") {
    setQualificationInput(suggestion);

  }
  setFilteredQualifications([]); //close suggestions dropdown
}

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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Profile Picture Section (1st Column) */}
              <div className="col-span-1  justify-center items-center">
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
              <div className="col-span-1 space-y-4">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    className="w-full border border-gray-300 rounded-md p-2 mt-1"
                  />
                </div>

                {/* Date of Birth */}
                <div>
                  <label
                    htmlFor="dob"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                {/* Gender */}
                <div>
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Marital Status */}
                <div>
                  <label
                    htmlFor="maritalStatus"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Marital Status
                  </label>
                  <select
                    id="maritalStatus"
                    name="maritalStatus"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                   <option>Select...</option>
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                  </select>
                </div>
              </div>

              {/* Additional Details (3rd Column) */}
              <div className="col-span-1 space-y-4">
                {/* Education */}
                <div>
                  <label className="block text-gray-600">Education</label>
                  <input
                       type="text"
                       value={qualificationInput}
                       onChange={handleQualificationChange}
                       placeholder="Search...."
                       className="w-full border border-gray-300 rounded p-2"
                       />
                       {filteredQualifications.length > 0 && (
                        <ul className="border border-gray-300 rounded mt-1 bg-white max-h-40 overflow-y-auto ">
                          {filteredQualifications.map ((q,index)=>(
                            <li 
                            key={index}
                            classname={`p-2 cursor-pointer ${
                              q === "None"
                                 ? "text-gray-500 cursor-not-allowed"
                                 : "hover:bg-indigo-100"
                            }`}
                            onClick={()=>handleSuggestionClick(q)}
                            >
                              
                            </li>
                          ))}
                        </ul>
                       )}
                </div>

                {/* Job Role */}
                <div>
                  <label className="block text-gray-600">Job Role</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                </div>

                {/* Experience */}
                <div>
                  <label
                    htmlFor="experience"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Experience
                  </label>
                  <select
                    id="experience"
                    name="experience"
                    className="w-full border border-gray-300 rounded-md p-2 mt-1"
                  >
                    <option>Select...</option>
                    <option>1-2 years</option>
                    <option>3-5 years</option>
                    <option>5-7 years</option>
                    <option>7-9 years</option>
                    <option>10+ years</option>
                  </select>
                </div>

                {/* Nationality */}
                <div>
                  <label
                    htmlFor="nationality"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nationality
                  </label>
                  <input
                    type="text"
                    id="nationality"
                    name="nationality"
                    className="mt- block w-full rounded p-2 border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="mt-16  ">
          <button className="bg-blue-500 ml-96  text-white px-6 py-2 rounded-md hover:bg-blue-600">
            Save Changes
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
