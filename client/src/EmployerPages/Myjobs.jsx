import { useEffect } from "react";

import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { getJobs } from "../UserPages/Redux/Actions/jobsActions";
import { useDispatch, useSelector } from "react-redux";

const JobsList = ({ title = "My Jobs", titleClass = "" }) => {
  const dispatch = useDispatch();

  const { loading, jobs, error } = useSelector((state) => state.jobsState);

  useEffect(() => {
    dispatch(getJobs());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>

      {loading && (
        <div className="text-center text-blue-500 text-lg">Loading jobs...</div>
      )}

      {error && <div className="text-center text-red-500 text-lg">{error}</div>}

      {!loading && !error && jobs?.length > 0 ? (
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
      ) : (
        !loading &&
        !error && (
          <div className="bg-white shadow-md rounded-lg p-6 mt-4 text-center">
            <h3 className="text-xl font-semibold text-gray-700">
              No jobs found.
            </h3>
          </div>
        )
      )}
    </div>
  );
};

export default JobsList;
