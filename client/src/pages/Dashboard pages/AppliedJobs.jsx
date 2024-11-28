import React from "react";

const AppliedJobs = () => {
  const appliedJobs = JSON.parse(localStorage.getItem("appliedJobs")) || [];

  return (
    <div className="bg-gray-50 min-h-screen py-8 flex justify-center mx-10">
      <div className="bg-white shadow-md rounded-lg w-full p-6">
        <h2 className="text-2xl font-bold mb-6">Applied Jobs</h2>
        {appliedJobs.length > 0 ? (
          <div className="space-y-4">
            {appliedJobs.map((job, index) => (
              <div
                key={index}
                className="p-4 bg-gray-100 border border-gray-300 rounded-lg"
              >
                <h3 className="text-lg font-semibold">
                  {job.jobTitle} at {job.company}
                </h3>
                <p className="text-sm text-gray-600">
                  Applied by: {job.name} ({job.email})
                </p>
                <p className="text-sm text-gray-600">
                  Applied on: {job.appliedDate}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No jobs applied yet.</p>
        )}
      </div>
    </div>
  );
};

export default AppliedJobs;
