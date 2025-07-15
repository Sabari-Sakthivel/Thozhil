import { useEffect, useState } from "react";
import axios from "axios";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const JobsList = ({title="My Jobs", titleClass=""}) => {
  const [jobs, setJobs] = useState([]);
  // const [JobCounts,setJobCounts] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:4000/company/getalljobdetails")
      .then((response) => {
        console.log("API Response:", response.data);
        const jobData = response.data.data || [];

        setJobs(jobData);

        // // Count jobs count same Job Title

        // const counts = {};
        // jobData.map((job)=>{
        //   const title = job.jobTitle;
        //   counts[title]=(counts[title] || 0) + 1;
        // })
        // setJobCounts(counts)
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
        setJobs([]);
      });
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="grid grid-cols-4 bg-gray-100 p-4 font-semibold text-gray-700">
          <div>Jobs</div>
          <div>Status</div>
          <div>Applications</div>
          <div>Action</div>
        </div>

        {jobs.map((job) => (
          <div
            key={job._id}
            className="grid grid-cols-4 items-center border-b px-4 py-3 hover:bg-gray-50"
          >
            <div>
              <h4 className="font-semibold">{job.jobTitle}</h4>
              <p className="text-sm text-gray-500">
                {job.jobtype} &bull;{" "}
                {new Date(job.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              {(() => {
                const isExpired = new Date(job.expirationDate) < new Date();
                return (
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                      isExpired
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {isExpired ? (
                      <>
                        <FaTimesCircle className="text-red-500" /> Expired
                      </>
                    ) : (
                      <>
                        <FaCheckCircle className="text-green-500" /> Active
                      </>
                    )} 
                  </span>
                );
              })()}
            </div>
            {0} Applications
            <div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-1 rounded">
                View Applications
              </button>
            </div>
          </div>
        ))}

        {jobs.length === 0 && (
          <div className="text-center py-6 text-gray-500">No jobs found.</div>
        )}
      </div>
    </div>
  );
};

export default JobsList;
