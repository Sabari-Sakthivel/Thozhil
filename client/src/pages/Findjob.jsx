import React, { useState } from "react";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { FaArrowRightLong,FaArrowLeftLong  } from "react-icons/fa6";


// Updated dummy data with varied job titles, roles, salaries, and locations
const jobs = [
  {
    id: 1,
    title: "Software Engineer",
    type: "FULL-TIME",
    salary: "₹6,00,000 - ₹8,00,000",
    company: "Google Inc.",
    location: "Bangalore, Karnataka",
  },
  {
    id: 2,
    title: "Product Manager",
    type: "FULL-TIME",
    salary: "₹10,00,000 - ₹12,00,000",
    company: "Microsoft",
    location: "Hyderabad, Telangana",
  },
  {
    id: 3,
    title: "Data Scientist",
    type: "FULL-TIME",
    salary: "₹7,00,000 - ₹9,50,000",
    company: "Facebook",
    location: "Pune, Maharashtra",
  },
  {
    id: 4,
    title: "Graphic Designer",
    type: "PART-TIME",
    salary: "₹3,00,000 - ₹4,00,000",
    company: "Adobe",
    location: "Chennai, Tamil Nadu",
  },
  {
    id: 5,
    title: "Marketing Specialist",
    type: "FULL-TIME",
    salary: "₹4,00,000 - ₹5,00,000",
    company: "Salesforce",
    location: "Mumbai, Maharashtra",
  },
  {
    id: 6,
    title: "Web Developer",
    type: "FULL-TIME",
    salary: "₹5,00,000 - ₹7,00,000",
    company: "Amazon",
    location: "Delhi, Delhi",
  },
  {
    id: 7,
    title: "UX Designer",
    type: "PART-TIME",
    salary: "₹4,50,000 - ₹5,50,000",
    company: "Apple",
    location: "Gurgaon, Haryana",
  },
  {
    id: 8,
    title: "DevOps Engineer",
    type: "FULL-TIME",
    salary: "₹9,00,000 - ₹11,00,000",
    company: "Netflix",
    location: "Noida, Uttar Pradesh",
  },
  {
    id: 9,
    title: "SEO Specialist",
    type: "PART-TIME",
    salary: "₹3,50,000 - ₹4,50,000",
    company: "HubSpot",
    location: "Kochi, Kerala",
  },
  {
    id: 10,
    title: "Backend Developer",
    type: "FULL-TIME",
    salary: "₹7,50,000 - ₹9,00,000",
    company: "Oracle",
    location: "Ahmedabad, Gujarat",
  },
  {
    id: 11,
    title: "Digital Marketing Intern",
    type: "INTERNSHIP",
    salary: "₹10,000 - ₹15,000 per month",
    company: "Zomato",
    location: "Indore, Madhya Pradesh",
  },
  {
    id: 12,
    title: "Finance Analyst Intern",
    type: "INTERNSHIP",
    salary: "₹12,000 - ₹18,000 per month",
    company: "HDFC Bank",
    location: "Jaipur, Rajasthan",
  },
  {
    id: 13,
    title: "Software Development Intern",
    type: "INTERNSHIP",
    salary: "₹15,000 - ₹20,000 per month",
    company: "Flipkart",
    location: "Bangalore, Karnataka",
  },
  {
    id: 14,
    title: "Content Writer Intern",
    type: "INTERNSHIP",
    salary: "₹8,000 - ₹12,000 per month",
    company: "Byju's",
    location: "Thiruvananthapuram, Kerala",
  },
  {
    id: 15,
    title: "Graphic Design Intern",
    type: "INTERNSHIP",
    salary: "₹8,000 - ₹10,000 per month",
    company: "Swiggy",
    location: "Mumbai, Maharashtra",
  },
  {
    id: 16,
    title: "Human Resources Intern",
    type: "INTERNSHIP",
    salary: "₹10,000 - ₹12,000 per month",
    company: "TCS",
    location: "Chennai, Tamil Nadu",
  },
  {
    id: 17,
    title: "Business Development Intern",
    type: "INTERNSHIP",
    salary: "₹12,000 - ₹15,000 per month",
    company: "Infosys",
    location: "Hyderabad, Telangana",
  },
  {
    id: 18,
    title: "Full Stack Developer",
    type: "FULL-TIME",
    salary: "₹6,50,000 - ₹8,50,000",
    company: "Paytm",
    location: "Delhi, Delhi",
  },
  {
    id: 19,
    title: "Mobile App Developer",
    type: "FULL-TIME",
    salary: "₹7,00,000 - ₹9,00,000",
    company: "PhonePe",
    location: "Gurgaon, Haryana",
  },
  {
    id: 20,
    title: "Data Analyst",
    type: "FULL-TIME",
    salary: "₹5,00,000 - ₹7,00,000",
    company: "Swiggy",
    location: "Pune, Maharashtra",
  },
  {
    id: 21,
    title: "Sales Intern",
    type: "INTERNSHIP",
    salary: "₹10,000 - ₹15,000 per month",
    company: "OYO Rooms",
    location: "Lucknow, Uttar Pradesh",
  },
  {
    id: 22,
    title: "Research Intern",
    type: "INTERNSHIP",
    salary: "₹10,000 - ₹12,000 per month",
    company: "ICICI Bank",
    location: "Surat, Gujarat",
  },
  {
    id: 23,
    title: "Cloud Engineer",
    type: "FULL-TIME",
    salary: "₹8,00,000 - ₹10,00,000",
    company: "AWS India",
    location: "Chandigarh, Punjab",
  },
  {
    id: 24,
    title: "Front-End Developer",
    type: "FULL-TIME",
    salary: "₹6,00,000 - ₹8,00,000",
    company: "Zoho Corporation",
    location: "Coimbatore, Tamil Nadu",
  },
  {
    id: 25,
    title: "Cybersecurity Analyst",
    type: "FULL-TIME",
    salary: "₹8,50,000 - ₹10,50,000",
    company: "Wipro",
    location: "Bhubaneswar, Odisha",
  },
  {
    id: 26,
    title: "Operations Intern",
    type: "INTERNSHIP",
    salary: "₹8,000 - ₹10,000 per month",
    company: "Urban Company",
    location: "Patna, Bihar",
  },
  {
    id: 27,
    title: "AI Engineer",
    type: "FULL-TIME",
    salary: "₹10,00,000 - ₹14,00,000",
    company: "OpenAI India",
    location: "Bangalore, Karnataka",
  },
];


const JobSearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 9;

  // Filter jobs based on search
  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      job.location.toLowerCase().includes(location.toLowerCase())
  );

  // Calculate the jobs to display based on the current page
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  // Total number of pages
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const popularSearches = [
    "Software Engineer",
    "Product Manager",
    "UX Designer",
    "AI Researcher",
    "Cloud Engineer",
  ];

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Search Inputs */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        <div className="flex flex-wrap gap-4">
          {/* Search Input */}
          <div className="relative w-full md:w-1/2">
            <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by Job title, Position, Keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border rounded-lg p-3 pl-10 w-full"
            />
          </div>

          {/* Location Input */}
          <div className="relative w-full md:w-1/4">
            <FaMapMarkerAlt className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="City, state or zip code"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border rounded-lg p-3 pl-10 w-full"
            />
          </div>

          {/* Find Job Button */}
          <div className="w-full md:w-auto">
            <button
              onClick={() => setCurrentPage(1)}
              className="bg-blue-500 text-white rounded-lg p-3 flex items-center gap-2 w-full md:w-auto"
            >
              Find Job
            </button>
          </div>
        </div>

        {/* Popular Searches */}
      </div>
      <div className="mt-4">
        <p className="font-medium">Popular searches:</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {popularSearches.map((search, index) => (
            <button
              key={index}
              onClick={() => {
                setSearchTerm(search);
                setCurrentPage(1); // Reset to the first page
              }}
              className="bg-gray-200 text-sm rounded-lg px-4 py-2 hover:bg-gray-300"
            >
              {search}
            </button>
          ))}
        </div>
      </div>

      {/* Job Listings */}
      <h2 className="text-2xl font-bold mb-4">Job Listings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg">{job.title}</h3>
              <span
                className={`text-sm font-medium px-2 py-1 rounded ${
                  job.type === "FULL-TIME"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {job.type}
              </span>
            </div>
            <p className="text-gray-500">{job.company}</p>
            <p className="text-gray-500 text-sm">{job.location}</p>
            <p className="text-gray-800 font-medium mt-2">{job.salary}</p>
            <button className="mt-4 bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600">
              Apply Now
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <ul className="flex space-x-2 items-center">
          {/* Left Arrow */}
          <li>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-full ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <FaArrowLeftLong />
            </button>
          </li>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index}>
              <button
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 rounded-full ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {index + 1}
              </button>
            </li>
          ))}

          {/* Right Arrow */}
          <li>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-full ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <FaArrowRightLong />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default JobSearchComponent;
