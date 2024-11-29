import React, { useState } from "react";
import { MdCheckCircle, MdCancel } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import amazon from "../../assets/Amazon.png";
import google from "../../assets/logo.png";
import cts from "../../assets/cts.png";
import { Link } from "react-router-dom";

const jobs = [
  {
    id: 1,
    title: "Software Engineer",
    type: "Full-Time",
    date: "25-11-2024",
    status: "Active",
    companyLogo: amazon,
    location: "Bengaluru",
    salary: "₹4 LPA",
  },
  {
    id: 2,
    title: "Product Manager",
    type: "Part-Time",
    date: "20-10-2024",
    status: "Expired",
    companyLogo: google,
    location: "Mumbai",
    salary: "₹12 LPA",
  },
  {
    id: 3,
    title: "UX Designer Intern",
    type: "Internship",
    date: "01-11-2024",
    status: "Active",
    companyLogo: cts,
    location: "Chennai",
    salary: "₹1.5 LPA",
  },
  {
    id: 4,
    title: "Data Scientist",
    type: "Contract",
    date: "15-10-2024",
    status: "Expired",
    companyLogo: amazon,
    location: "Hyderabad",
    salary: "₹10 LPA",
  },
  {
    id: 5,
    title: "DevOps Engineer",
    type: "Remote",
    date: "05-11-2024",
    status: "Active",
    companyLogo: google,
    location: "WFH (India)",
    salary: "₹15 LPA",
  },
  {
    id: 6,
    title: "Software Engineer",
    type: "Full-Time",
    date: "25-11-2024",
    status: "Active",
    companyLogo: amazon,
    location: "Bengaluru",
    salary: "₹4 LPA",
  },
  {
    id: 7,
    title: "Product Manager",
    type: "Part-Time",
    date: "20-10-2024",
    status: "Expired",
    companyLogo: google,
    location: "Mumbai",
    salary: "₹12 LPA",
  },
  {
    id: 8,
    title: "UX Designer Intern",
    type: "Internship",
    date: "01-11-2024",
    status: "Active",
    companyLogo: cts,
    location: "Chennai",
    salary: "₹1.5 LPA",
  },
  {
    id: 9,
    title: "Data Scientist",
    type: "Contract",
    date: "15-10-2024",
    status: "Expired",
    companyLogo: amazon,
    location: "Hyderabad",
    salary: "₹10 LPA",
  },
  {
    id: 10,
    title: "DevOps Engineer",
    type: "Remote",
    date: "05-11-2024",
    status: "Active",
    companyLogo: google,
    location: "WFH (India)",
    salary: "₹15 LPA",
  },
];

const AppliedJobs = () => {
  const [activeRow, setActiveRow] = useState(null); // Correct useState placement

  return (
    <div>
      <div>
        <table className="min-w-full overflow-hidden rounded-lg table-auto">
          <thead className="bg-gray-300 font-bold">
            <tr>
              <th className="px-10 py-3 text-left text-sm">Job</th>
              <th className="px-6 py-3 text-left text-sm">Type</th>
              <th className="px-6 py-3 text-left text-sm">Date Applied</th>
              <th className="px-8 py-3 text-left text-sm">Status</th>
              <th className="px-12 py-3 text-left text-sm">Action</th>
            </tr>
          </thead>

          <tbody>
            {jobs.map((job) => (
              <tr
                key={job.id}
                className={`border-b last:border-b-0 ${
                  activeRow === job.id ? "shadow-lg bg-gray-100" : ""
                }`}
                onClick={() => setActiveRow(job.id)}
              >
                <td className="px-6 py-4 text-sm flex items-center">
                  {/* Company Logo */}
                  <img
                    src={job.companyLogo}
                    alt={`${job.title} logo`}
                    className="w-12 h-12 mr-4 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{job.title}</p>
                    <div className="text-gray-500 text-sm flex items-center mt-1">
                      <FaMapMarkerAlt className="mr-2 text-blue-500" />
                      {job.location}
                      <span className="ml-4 text-green-600 font-semibold">
                        {job.salary}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">{job.type}</td>
                <td className="px-6 py-4 text-sm">{job.date}</td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`px-3 py-1 rounded ${
                      job.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : job.status === "Expired"
                        ? "bg-red-100 text-red-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {job.status === "Active" ? (
                      <MdCheckCircle className="inline-block mr-2 text-green-600" />
                    ) : job.status === "Expired" ? (
                      <MdCancel className="inline-block mr-2 text-red-600" />
                    ) : null}
                    {job.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <Link
                    to={"/findjob/jobdescription"}
                    className="bg-gray-200 font-semibold hover:bg-blue-500 hover:text-white text-blue-500 px-4 py-2 rounded"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppliedJobs;
