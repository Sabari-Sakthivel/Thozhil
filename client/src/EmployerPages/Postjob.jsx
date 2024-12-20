import React from 'react';

const PostJobForm = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl text-gray-950 font-bold mb-6">Post a Job :</h1>

      {/* Job Title and Tags */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-lg text-gray-700 font-bold mb-2">Job Title :</label>
          <input type="text" placeholder="Add job title, role, vacancies etc" className="w-full border border-gray-300 p-2 rounded-md" />
        </div>
        <div>
          <label className="block text-lg text-gray-700 font-bold mb-2">Tags :</label>
          <input type="text" placeholder="Job keyword, tags etc..." className="w-full border border-gray-300 p-2 rounded-md" />
        </div>
      </div>

      {/* Salary Section */}
      <div>
      <h2 className="text-lg text-gray-700 font-bold mb-4">Salary :</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm text-gray-400 font-medium mb-2">Min Salary</label>
          <input type="number" placeholder="Minimum salary..." className="w-full border border-gray-300 p-2 rounded-md" />
        </div>
        <div>
          <label className="block text-sm text-gray-400 font-medium mb-2">Max Salary</label>
          <input type="number" placeholder="Maximum salary..." className="w-full border border-gray-300 p-2 rounded-md" />
        </div>
        <div>
          <label className="block text-sm text-gray-400 font-medium mb-2">Salary Type</label>
          <select className="w-full border border-gray-300 p-2 rounded-md">
            <option>Select...</option>
            <option>Hourly</option>
            <option>Monthly</option>
            <option>Yearly</option>
          </select>
        </div>
      </div>
      </div>

      {/* Advanced Information */}
      <h2 className="text-lg text-gray-700 font-bold mb-4">Advanced Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm text-gray-400 font-medium mb-2">Education</label>
          <select className="w-full border border-gray-300 p-2 rounded-md">
            <option>Select...</option>
            <option>High School</option>
            <option>Bachelor's</option>
            <option>Master's</option>
            <option>PhD</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-400 font-medium mb-2">Experience</label>
          <select className="w-full border border-gray-300 p-2 rounded-md">
            <option>Select...</option>
            <option>Fresher</option>
            <option>1-2 Years</option>
            <option>3-5 Years</option>
            <option>5+ Years</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-400 font-medium mb-2">Job Type</label>
          <select className="w-full border border-gray-300 p-2 rounded-md">
            <option>Select...</option>
            <option>Full-Time</option>
            <option>Part-Time</option>
            <option>Contract</option>
            <option>Freelance</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-400 font-medium mb-2">Vacancies</label>
          <input type="number" placeholder="Number of vacancies" className="w-full border border-gray-300 p-2 rounded-md" />
        </div>
        <div>
          <label className="block text-sm text-gray-400 font-medium mb-2">Expiration Date</label>
          <input type="date" className="w-full border border-gray-300 p-2 rounded-md" />
        </div>
        <div>
          <label className="block text-sm text-gray-400 font-medium mb-2">Job Level</label>
          <select className="w-full border border-gray-300 p-2 rounded-md">
            <option>Select...</option>
            <option>Entry Level</option>
            <option>Mid Level</option>
            <option>Senior Level</option>
          </select>
        </div>
      </div>

      {/* Location Section */}
      <h2 className="text-lg text-gray-700 font-bold mb-4">Location :</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm text-gray-400  font-medium mb-2">Country</label>
          <select className="w-full border border-gray-300 p-2 rounded-md">
            <option>Select...</option>
            <option>USA</option>
            <option>Canada</option>
            <option>India</option>
            <option>UK</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-400   font-medium mb-2">City</label>
          <input type="text" placeholder="Enter city" className="w-full border border-gray-300 p-2 rounded-md" />
        </div>
      </div>


      {/* Benefits */}
      <div>
      <h3 className="text-lg font-bold text-gray-700 mb-4">Job Benefits :</h3>
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
        
        <div className="flex flex-wrap gap-2">
          {["401k Salary", "Learning Budget", "Vision Insurance", "4-day Workweek", "Profit Sharing", "Free Gym Membership", "Equity Compensation", "Annual Bonus"].map((benefit) => (
            <span
              key={benefit}
              className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium"
            >
              {benefit}
            </span>
          ))}
        </div>
      </div>
      </div>

      {/* Job Description */}
      <div className="mb-6 mt-5">
        <label className="block text-lg text-gray-700 font-bold mb-2">Job Description :</label>
        <textarea 
        rows={8}
        placeholder="Write job description here..." 
        className="w-full border border-gray-300 p-2 rounded-md "></textarea>
      </div>

      {/* Apply Job Options */}
      <div className="mb-6">
        <label className="block text-lg  font-bold text-gray-700 mb-2">Apply Job On :</label>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input type="radio" name="apply" className="form-radio" />
            On JobHire
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="apply" className="form-radio" />
            External Platform
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="apply" className="form-radio" />
            On Your Email
          </label>
        </div>
      </div>

      {/* Post Job Button */}
      <button className="w-fit bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
        Post Job
      </button>
    </div>
  );
};

export default PostJobForm;
