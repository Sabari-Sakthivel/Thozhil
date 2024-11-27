import React from "react";

const AppliedJobs = ({ jobs }) => {
  return (
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
  );
};

export default AppliedJobs;
