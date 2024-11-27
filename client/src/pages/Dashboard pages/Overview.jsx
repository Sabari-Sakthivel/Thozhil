import React from "react";

const OverviewContent = () => {
  // Example job data
  const jobs = [
    {
      id: 1,
      title: "Software Engineer",
      type: "Full-time",
      location: "Chennai",
      salary: "₹12,00,000/year",
      date: "Nov 20, 2024",
      status: "Active",
    },
    {
      id: 2,
      title: "Data Analyst",
      type: "Part-time",
      location: "Bangalure",
      salary: " ₹6,00,000/year",
      date: "Nov 15, 2024",
      status: "Inactive",
    },
  ];

  return (
    <div className="flex-grow p-6">
      {/* Main Content */}
      <div className="flex-grow p-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Hello, Sabari Sakthivel</h2>
          <p className="text-gray-600 mb-6">
            Here are your daily activities and job alerts.
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="bg-blue-100 p-4 rounded shadow">
            <p className="text-lg font-bold">0</p>
            <p className="text-gray-600">Applied Jobs</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded shadow">
            <p className="text-lg font-bold">0</p>
            <p className="text-gray-600">Saved Jobs</p>
          </div>
          <div className="bg-green-100 p-4 rounded shadow">
            <p className="text-lg font-bold">0</p>
            <p className="text-gray-600">Job Alerts</p>
          </div>
        </div>

        {/* Profile Reminder */}
        <div className="bg-red-100 p-4 rounded shadow mb-6">
          <p className="text-red-600 font-bold">
            Your profile editing is not completed.
          </p>
          <button className="bg-red-500 text-white px-4 py-2 rounded mt-2">
            Edit Profile
          </button>
        </div>

        {/* Recently Applied Jobs */}
        <div>
          <h3 className="text-xl font-bold mb-4">Recently Applied</h3>
          <div className="bg-white shadow-md rounded p-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="flex justify-between items-center border-b pb-4 mb-4 last:border-b-0"
              >
                <div>
                  <h4 className="text-lg font-bold">{job.title}</h4>
                  <p className="text-sm text-gray-500">
                    {job.type} - {job.location}
                  </p>
                  <p className="text-sm text-gray-500">{job.salary}</p>
                  <p className="text-sm text-gray-500">{job.date}</p>
                </div>
                <div>
                  <span
                    className={`text-sm font-bold px-3 py-1 rounded ${
                      job.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {job.status}
                  </span>
                  <button className="ml-4 bg-blue-500 text-white px-4 py-2 rounded">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewContent;
