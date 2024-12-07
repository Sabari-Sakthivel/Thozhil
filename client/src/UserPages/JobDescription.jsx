import React, { useState } from "react";
import joblogo from "../assets/logo.png";
import { SlCalender } from "react-icons/sl";
import { RxLapTimer } from "react-icons/rx";
import {
  FaUserGraduate,
  FaBriefcase,
  FaRegBookmark,
  FaBookmark,
} from "react-icons/fa";

const JobDescription = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [savedJobs, setSavedJobs] = useState([]);
  const [isJobSaved, setJobSaved] = useState(false);

  const openPopup = () => setPopupOpen(true);
  const closePopup = () => setPopupOpen(false);

  const handleSaveJob = () => {
    const jobDetails = {
      title: "Senior UX Designer",
      company: "Google",
      location: "Chennai, Tamil Nadu",
      salary: "₹6,00,000 - ₹800,000",
    };

    if (!isJobSaved) {
      setSavedJobs((prev) => [...prev, jobDetails]);
      setJobSaved(true);
      setSuccessMessage("Job saved successfully!");
    } else {
      setSavedJobs((prev) =>
        prev.filter((job) => job.title !== jobDetails.title)
      );
      setJobSaved(false);
      setSuccessMessage("Job removed from saved list!");
    }

    setTimeout(() => setSuccessMessage(""), 2000);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage("Job Application submitted Successfully");
    setPopupOpen(false);

    setTimeout(() => {
      setSuccessMessage("");
    }, 2000);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 lg:px-10 flex justify-center">
      <div className="bg-white shadow-md rounded-lg w-full max-w-7xl p-6">
        {/* Job Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
          <div className="flex items-start space-x-4">
            <img
              src={joblogo}
              alt="Company Logo"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h1 className="text-2xl font-semibold">Senior UX Designer</h1>
              <p className="text-gray-500 mt-2">
                at Google{" "}
                <span className="ml-3 bg-green-500 text-white text-sm rounded p-1">
                  FULL-TIME
                </span>
              </p>
            </div>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleSaveJob}
              className="text-blue-600 hover:text-blue-800"
              title={isJobSaved ? "Remove from Saved Jobs" : "Save Job"}
            >
              {isJobSaved ? <FaBookmark size={24} /> : <FaRegBookmark size={24} />}
            </button>
            <button
              onClick={openPopup}
              className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700"
            >
              Apply Now →
            </button>
          </div>
        </div>

        {/* Job Details */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-3">
            {/* Job Description */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Job Description</h3>
              <p className="text-gray-700 leading-6">
                Velstar is a Shopify Plus agency, and we partner with brands to
                help them grow. Here at Velstar, we don't just make websites; we
                create exceptional digital experiences that consumers love.
                <br />
                <br />
                The role will involve translating project specifications into
                clean, test-driven, easily maintainable code.
                <br />
                <br />
                Responsibilities include:
              </p>
              <ul className="list-disc list-inside text-gray-700 mt-4 space-y-2">
                <li>Collaborating with cross-functional teams.</li>
                <li>Optimizing applications for maximum scalability.</li>
                <li>Writing clean, testable code.</li>
                <li>Participating in code reviews and mentoring juniors.</li>
              </ul>
            </div>

            {/* Requirements */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Requirements</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>3+ years of experience in back-end development.</li>
                <li>Proficiency in HTML, JavaScript, PHP, and Laravel.</li>
                <li>Strong database management skills.</li>
                <li>Experience with Git version control.</li>
                <li>Excellent communication skills.</li>
              </ul>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Salary and Location */}
            <div className="flex items-center justify-between border border-gray-300 rounded-lg p-4">
              <div className="text-center">
                <h2 className="text-sm font-semibold text-gray-500">
                  Salary (Rupees)
                </h2>
                <p className="text-lg font-bold text-green-600">
                  ₹6,00,000 - ₹800,000
                </p>
              </div>
              <div className="text-center">
                <h2 className="text-sm font-semibold text-gray-500">
                  Job Location
                </h2>
                <p className="text-lg font-bold">Chennai, Tamil Nadu</p>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
              <h3 className="text-lg font-bold mb-4">Job Benefits :</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "401k Salary",
                  "Learning Budget",
                  "Vision Insurance",
                  "4-day Workweek",
                  "Profit Sharing",
                  "Free Gym Membership",
                  "Equity Compensation",
                  "Annual Bonus",
                ].map((benefit) => (
                  <span
                    key={benefit}
                    className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-medium"
                  >
                    {benefit}
                  </span>
                ))}
              </div>
            </div>

            {/* Job Overview */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
              <h3 className="text-lg font-bold mb-4">Job Overview</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center">
                  <SlCalender className="text-blue-600 text-2xl mx-auto" />
                  <p className="text-xs font-bold text-gray-400">Job Posted</p>
                  <p className="text-xs font-bold">14 Jun, 2021</p>
                </div>
                <div className="text-center">
                  <RxLapTimer className="text-blue-600 text-2xl mx-auto" />
                  <p className="text-xs font-bold text-gray-400">
                    Job Expires In
                  </p>
                  <p className="text-xs font-bold">14 Aug, 2021</p>
                </div>
                <div className="text-center">
                  <FaBriefcase className="text-blue-600 text-2xl mx-auto" />
                  <p className="text-xs font-bold text-gray-400">Job Type</p>
                  <p className="text-xs font-bold">Full-time</p>
                </div>
                <div className="text-center">
                  <FaUserGraduate className="text-blue-600 text-2xl mx-auto" />
                  <p className="text-xs font-bold text-gray-400">
                    Experience Needed
                  </p>
                  <p className="text-xs font-bold">3-5 years</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <p className="text-green-600 text-center mt-4">{successMessage}</p>
        )}

        {/* Application Popup */}
        {isPopupOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
              <h2 className="text-lg font-semibold mb-4">Apply for Job</h2>
              <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Resume (PDF)
                  </label>
                  <input
                    type="file"
                    accept=".pdf"
                    required
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={closePopup}
                    className="bg-gray-400 text-white px-4 py-2 rounded-md mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md"
                  >
                    Submit
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

export default JobDescription;
