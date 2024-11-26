import React, { useState } from "react";
import joblogo from "../assets/logo.png";
import { SlCalender } from "react-icons/sl";
import { RxLapTimer } from "react-icons/rx";
import { FaUserGraduate, FaBriefcase, FaRegBookmark } from "react-icons/fa";

const JobDescription = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage("Job Application submitted Successfully");
    setPopupOpen(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8 flex justify-center mx-10">
      <div className="bg-white shadow-md rounded-lg w-full p-6">
        {/* Job Header */}
        <div className="flex items-start justify-between">
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
          <div className="bg-blue-300 px-2 py-1 text- ml-[620px] mt-4">
            <button>
              <FaRegBookmark />
            </button>
          </div>
          <button
            onClick={openPopup}
            className="bg-blue-600 text-white px-4 py-2 mr-28 mt-3 rounded-md shadow hover:bg-blue-700"
          >
            Apply Now →
          </button>
        </div>

        {/* Job Description */}
        <div className="grid grid-cols-5 gap-10">
          <div className="col-span-3">
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Job Description</h3>
              <p className="text-gray-700 leading-6">
                Velstar is a Shopify Plus agency, and we partner with brands to
                help them grow. Here at Velstar, we don't just make websites, we
                create exceptional digital experiences that consumers love. Our
                team of designers, developers, strategists, and creators work
                together to push brands to the next level.
                <br />
                <br />
                The role will involve translating project specifications into
                clean, test-driven, easily maintainable code. You will work
                closely with the design and product teams to ensure the
                implementation of high-quality user interfaces and seamless
                experiences. As a key member of the development team, you'll be
                tasked with contributing to the architecture and scaling of the
                platform.
                <br />
                <br />
                Additional responsibilities will include:
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>
                    Collaborating with cross-functional teams to design and ship
                    new features.
                  </li>
                  <li>
                    Optimizing applications for maximum speed and scalability.
                  </li>
                  <li>
                    Writing clean, testable, and efficient code using the latest
                    technologies.
                  </li>
                  <li>
                    Reviewing and improving existing code and software
                    development practices.
                  </li>
                  <li>
                    Participating in code reviews and mentoring junior
                    developers.
                  </li>
                </ul>
              </p>
            </div>

            {/* Requirements */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Requirements</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>
                  Great troubleshooting and analytical skills combined with the
                  desire to tackle challenges.
                </li>
                <li>
                  3+ years of experience in back-end development working on
                  simultaneous projects.
                </li>
                <li>
                  Experience with HTML, JavaScript, CSS, PHP, and Laravel.
                </li>
                <li>
                  Strong knowledge of database management and query optimization
                  techniques.
                </li>
                <li>Experience with version control systems such as Git.</li>
                <li>
                  Excellent communication skills and a team-oriented mindset.
                </li>
              </ul>
            </div>
          </div>
          <div className="col-span-2">
            {/* Salary, Location, and Remote Status */}
            <div className="mt-6 flex items-center justify-between gap-4 border border-gray-300 rounded-lg py-4">
              <div className="flex flex-col items-center justify-center w-1/2 pr-4">
                <h2 className="text-sm font-semibold ml-3 text-gray-500">
                  Salary (Rupees)
                </h2>
                <p className="text-lg font-bold ml-3 text-green-600">
                  ₹6,00,000 - ₹800,000
                </p>
              </div>
              <div className="border-r border-gray-300 h-12"></div>
              <div className="flex flex-col items-center justify-center w-1/2 pl-4">
                <h2 className="text-sm mr-3 font-semibold text-gray-500">
                  Job Location
                </h2>
                <p className="text-lg mr-3 font-bold">Chennai, TamilNadu</p>
              </div>
            </div>

            {/* Job Benefits */}
            <div className="mt-6">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
                <h3 className="text-lg font-bold mb-4">Job Benefits :</h3>
                <div className="flex flex-wrap gap-4">
                  {[
                    "401k Salary",
                    "Async Work Environment",
                    "Learning Budget",
                    "Vision Insurance",
                    "4-day Workweek",
                    "Profit Sharing",
                    "Free Gym Membership",
                    "Equity Compensation",
                    "No Politics at Work",
                    "Annual Bonus",
                    "Health and Dental Insurance",
                    "Paid Time Off (PTO)",
                    "Employee Stock Purchase Plan (ESPP)",
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
            </div>

            {/* Job Overview */}
            <div className="mt-6">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
                <h3 className="text-lg font-bold px-4 mb-4">Job Overview:</h3>
                <div className="flex gap-8 mb-8 px-16">
                  <div className="flex flex-col items-center gap-2">
                    <SlCalender className="text-blue-600 text-2xl" />
                    <h4 className="text-xs font-bold text-gray-400">
                      Job Posted
                    </h4>
                    <p className="text-xs font-bold text-black">14 Jun, 2021</p>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <RxLapTimer className="text-blue-600 text-2xl" />
                    <h4 className="text-xs font-bold text-gray-400">
                      Job Expires In
                    </h4>
                    <p className="text-xs font-bold text-black">14 Aug, 2021</p>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <FaBriefcase className="text-blue-600 text-2xl" />
                    <h4 className="text-xs font-bold text-gray-400">
                      Job Level
                    </h4>
                    <p className="text-xs font-bold text-black">Entry Level</p>
                  </div>
                </div>

                {/* Second Line (2 Icons) */}
                <div className="flex gap-8 mb-4 px-16">
                  <div className="flex flex-col items-center gap-2">
                    <FaUserGraduate className="text-blue-600 text-2xl" />
                    <h4 className="text-xs font-bold text-gray-400">
                      Qualification
                    </h4>
                    <p className="text-xs font-bold text-black">
                      B.Tech, M.Tech
                    </p>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <FaBriefcase className="text-blue-600 text-2xl" />
                    <h4 className="text-xs font-bold text-gray-400">
                      Years of Experience
                    </h4>
                    <p className="text-xs font-bold text-black">2 Years</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="fixed top-28 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg">
          <p>{successMessage}</p>
        </div>
      )}

      {/* Popup Modal */}
      {isPopupOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closePopup}
        >
          <div
            className="bg-white w-96 p-6 rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4">Apply for this Job</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="cv"
                  className="block text-sm font-medium text-gray-700"
                >
                  Upload CV
                </label>
                <input
                  type="file"
                  id="cv"
                  name="cv"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  accept=".pdf,.doc,.docx"
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={closePopup}
                  className="bg-gray-300 text-black px-4 py-2 rounded-md shadow"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDescription;
