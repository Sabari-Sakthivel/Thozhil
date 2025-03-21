import { useEffect, useState } from "react";
import axios from "axios";

const JobsList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/company/getalljobdetails") // Update API URL
      .then(response => {
        console.log("API Response:", response.data);
        setJobs(response.data.data || []); // Ensure it's an array
      })
      .catch(error => {
        console.error("Error fetching jobs:", error);
        setJobs([]); // Set jobs to an empty array in case of error
      });
  }, []);
  

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Job Listings</h2>
      <ul className="space-y-4">
        {jobs.map((job) => (
          <li key={job._id} className="p-4 border rounded shadow">
            <h3 className="text-xl font-semibold">{job.jobTitle}</h3>
            <p><strong>Experience:</strong> {job.salary.experience}</p>
            <p><strong>Education:</strong> {job.salary.education}</p>
            <p><strong>Job Type:</strong> {job.jobType}</p>
            <p><strong>Vacancies:</strong> {job.vacancies}</p>
            <p><strong>Expiration Date:</strong> {new Date(job.expirationDate).toLocaleDateString()}</p>
            <p><strong>Level:</strong> {job.jobLevel}</p>
            <p><strong>Description:</strong> {job.jobDescription}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobsList;
