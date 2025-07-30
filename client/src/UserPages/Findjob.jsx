// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaBookmark, FaRegBookmark } from "react-icons/fa";
// import { Link } from "react-router-dom";

// function JobListings() {
//   const [jobs, setJobs] = useState([]);
//   const [savedJobs, setSavedJobs] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:4000/company/getalljobdetails")
//       .then((response) => {
//         setJobs(response.data.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching jobs:", error);
//       });
//   }, []);

//   const toggleSaveJob = (jobId) => {
//     setSavedJobs((prevSavedJobs) =>
//       prevSavedJobs.includes(jobId)
//         ? prevSavedJobs.filter((id) => id !== jobId)
//         : [...prevSavedJobs, jobId]
//     );
//   };

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">Job Listings</h2>
//       {jobs.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {jobs.map((job) => (
//             <div
//               key={job._id}
//               className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition relative"
//             >
//               <button
//                 onClick={() => toggleSaveJob(job._id)}
//                 className="absolute bottom-7 right-10 text-gray-400 hover:text-blue-500"
//               >
//                 {savedJobs.includes(job._id) ? <FaBookmark /> : <FaRegBookmark />}
//               </button>

//               <div className="flex items-center justify-between">
//                <h3 className="font-bold text-lg">{job?.jobTitle || "No Title"}</h3>

//                 <span
//                   className={`text-sm font-medium px-2 py-1 rounded ${
//                     job.type === "FULL-TIME"
//                       ? "bg-green-100 text-green-700"
//                       : job.type === "PART-TIME"
//                       ? "bg-yellow-100 text-yellow-700"
//                       : "bg-blue-100 text-blue-700"
//                   }`}
//                 >
//                   {job.type}
//                 </span>
//               </div>

//               <p className="text-gray-500">{job.company}</p>

//               <p className="text-gray-500 text-sm">
//                 {job.location
//                   ? `${job.location.city}, ${job.location.country}`
//                   : "Location not specified"}
//               </p>

//               <p className="text-gray-800 font-medium mt-2">
//                 {job.salary
//                   ? `₹${job.salary.min} - ₹${job.salary.max} (${job.salary.type})`
//                   : "Salary not disclosed"}
//               </p>

//               <Link
//                 to="jobdescription"
//                 className="mt-4 inline-block bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
//               >
//                 Apply Now
//               </Link>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="bg-white shadow-md rounded-lg p-6 mt-4 text-center">
//           <h3 className="text-xl font-semibold text-gray-700">No jobs found.</h3>
//         </div>
//       )}
//     </div>
//   );
// }

// export default JobListings;

import React, { useEffect } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getJobs } from "./Redux/Actions/jobsActions";

function JobListings() {
  const dispatch = useDispatch();

  const { loading, jobs, error } = useSelector((state) => state.jobsState);

  useEffect(() => {
    dispatch(getJobs()); 
  }, [dispatch]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Job Listings</h2>

      {loading && (
        <div className="text-center text-blue-500 text-lg">Loading jobs...</div>
      )}

      {error && (
        <div className="text-center text-red-500 text-lg">{error}</div>
      )}

      {!loading && !error && jobs?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition relative"
            >
              {/* <button className="absolute bottom-7 right-10 text-gray-400 hover:text-blue-500">
                <FaRegBookmark />
              </button> */}

              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg">{job.jobTitle || "No Title"}</h3>
                <span
                  className={`text-sm font-medium px-2 py-1 rounded ${
                    job.type === "FULL-TIME"
                      ? "bg-green-100 text-green-700"
                      : job.type === "PART-TIME"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {job.type || "N/A"}
                </span>
              </div>

              <p className="text-gray-500">{job.company}</p>
              <p className="text-gray-500 text-sm">
                {job.location
                  ? `${job.location.city}, ${job.location.country}`
                  : "Location not specified"}
              </p>
              <p className="text-gray-800 font-medium mt-2">
                {job.salary
                  ? `₹${job.salary.min} - ₹${job.salary.max} (${job.salary.type})`
                  : "Salary not disclosed"}
              </p>

              <Link
                to="jobdescription"
                className="mt-4 inline-block bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
              >
                Apply Now
              </Link>
            </div>
          ))}
        </div>
      ) : (
        !loading &&
        !error && (
          <div className="bg-white shadow-md rounded-lg p-6 mt-4 text-center">
            <h3 className="text-xl font-semibold text-gray-700">No jobs found.</h3>
          </div>
        )
      )}
    </div>
  );
}

export default JobListings;
