import React, { useState } from "react";
import axios from "axios";

const PostJobForm = () => {
  const [selectedBenefits, setSelectedBenefits] = useState([]);
  const [formData, setFormData] = useState({
    jobTitle: "",
    tags: "",
    minSalary: "",
    maxSalary: "",
    salaryType: "",
    education: "",
    experience: "",
    jobType: "",
    vacancies: "",
    expirationDate: "",
    jobLevel: "",
    country: "",
    city: "",
    jobDescription: "",
  });

  const benefits = [
    "Paid Parental Leave",
    "Health Insurance",
    "Learning Budget",
    "Onsite Cafeteria",
    "Stock Options",
    "Wellness Programs",
    "Vision Insurance",
    "5-day Workweek",
    "Profit Sharing",
    "Free Gym Membership",
    "Equity Compensation",
    "Annual Bonus",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBenefitClick = (benefit) => {
    setSelectedBenefits((prevSelected) =>
      prevSelected.includes(benefit)
        ? prevSelected.filter((b) => b !== benefit)
        : [...prevSelected, benefit]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure salary & location are structured correctly
    const jobData = {
      ...formData,
      vacancies: formData.vacancies,
      expirationDate: formData.expirationDate,
      jobLevel: formData.jobLevel,
      salary: {
        min: parseInt(formData.minSalary) || 0,
        max: parseInt(formData.maxSalary) || 0,
        type: formData.salaryType,
      },
      location: {
        country: formData.country,
        city: formData.city,
      },
      benefits: selectedBenefits,
    };

    console.log("Submitting Job Data:", jobData);

    try {
      const response = await axios.post(
        "http://localhost:4000/company/postjobdetails",
        jobData
      );
      alert("Job Posted Successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error posting job:", error);
      alert("Failed to post job.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md"
    >
      <h1 className="text-2xl text-gray-700 text-center font-bold mb-10">
        Post a Job
      </h1>

      {/* Job Title and Tags */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-lg text-gray-700 font-bold mb-2">
            Job Title:
          </label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-lg text-gray-700 font-bold mb-2">
            Tags:
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
      </div>

      {/* Salary Section */}
      <h2 className="text-lg text-gray-700 font-bold mb-4">Salary:</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="number"
          name="minSalary"
          value={formData.minSalary}
          onChange={handleChange}
          placeholder="Min Salary"
          className="w-full border border-gray-300 p-2 rounded-md"
          required
        />
        <input
          type="number"
          name="maxSalary"
          value={formData.maxSalary}
          onChange={handleChange}
          placeholder="Max Salary"
          className="w-full border border-gray-300 p-2 rounded-md"
          required
        />
        <select
          name="salaryType"
          value={formData.salaryType}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-md"
        >
          <option value="">Select Salary Type...</option>
          <option value="Hourly">Hourly</option>
          <option value="Monthly">Monthly</option>
          <option value="Yearly">Yearly</option>
        </select>
      </div>

      {/* Advanced Information */}
      <h2 className="text-lg text-gray-700 font-bold mb-4">
        Advanced Information :
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <select
          name="education"
          value={formData.education}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-md"
        >
          <option value="">Select Education...</option>
          <option value="High School">High School</option>
          <option value="Bachelor's">Bachelor's</option>
          <option value="Master's">Master's</option>
          <option value="PhD">PhD</option>
        </select>
        <select
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-md"
        >
          <option value="">Select Experience...</option>
          <option value="Fresher">Fresher</option>
          <option value="1-2 Years">1-2 Years</option>
          <option value="3-5 Years">3-5 Years</option>
          <option value="5+ Years">5+ Years</option>
        </select>
        <select
          name="jobType"
          value={formData.jobType}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-md"
        >
          <option value="">Select Job Type...</option>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Contract">Contract</option>
          <option value="Freelance">Freelance</option>
        </select>
      </div>

      {/* Location */}
      <h2 className="text-lg text-gray-700 font-bold mb-4">Location:</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          placeholder="Country"
          className="w-full border border-gray-300 p-2 rounded-md"
          required
        />
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="City"
          className="w-full border border-gray-300 p-2 rounded-md"
          required
        />
      </div>
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <div className="flex-1">
          <label className="text-lg text-gray-700 font-bold ">
            Vacancies :
          </label>
          <input
            type="number"
            name="vacancies"
            placeholder="Number of vacancies"
            value={formData.vacancies}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>

        <div className="flex-1">
          <label className="text-lg text-gray-700 font-bold mt-3 mb-4">
            Expiration Date :
          </label>
          <input
            type="date"
            name="expirationDate"
            value={formData.expirationDate}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>

        <div className="flex-1">
          <label className="text-lg text-gray-700 font-bold ">
            Job Level :
          </label>
          <select
            name="jobLevel"
            value={formData.jobLevel}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 mb-4 rounded-md"
          >
            <option value="">Select...</option>
            <option value="Entry Level">Entry Level</option>
            <option value="Mid Level">Mid Level</option>
            <option value="Senior Level">Senior Level</option>
          </select>
        </div>
      </div>

      {/* Job Benefits */}
      <h3 className="text-lg font-bold mt-3 text-gray-700 mb-4">Job Benefits:</h3>
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300 flex flex-wrap gap-4">
        {benefits.map((benefit) => (
          <span
            key={benefit}
            onClick={() => handleBenefitClick(benefit)}
            className={`cursor-pointer px-3 py-1 rounded-full text-xs font-medium ${
              selectedBenefits.includes(benefit)
                ? "bg-blue-200 text-blue-800"
                : "bg-blue-50 text-blue-600"
            }`}
          >
            {benefit}
          </span>
        ))}
      </div>

      {/* Job Description & Submit */}
      <h3 className="text-lg font-bold text-gray-700 mt-3">Job Description:</h3>
      <textarea
        name="jobDescription"
        value={formData.jobDescription}
        onChange={handleChange}
        rows={6}
        placeholder="Write job description here..."
        className="w-full border border-gray-300 p-2 rounded-md mt-5"
        required
      ></textarea>

      <div className="flex justify-center">
        <button
          type="submit"
          className="w-36 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mt-4"
        >
          Post Job
        </button>
      </div>
    </form>
  );
};

export default PostJobForm;
