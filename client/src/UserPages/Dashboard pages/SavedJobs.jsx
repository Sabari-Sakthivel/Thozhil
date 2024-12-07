import React from "react";

const SavedJobs = ({ savedJobs }) => {
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold mb-4">Saved Jobs</h2>
      {savedJobs.length === 0 ? (
        <p>No jobs saved yet.</p>
      ) : (
        <ul className="list-disc list-inside space-y-4">
          {savedJobs.map((job, index) => (
            <li key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg">{job.title}</h3>
              <p>{job.company}</p>
              <p>{job.location}</p>
              <p className="text-green-600 font-bold">{job.salary}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedJobs;
