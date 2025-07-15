import React from "react";
import { PiBriefcaseLight } from "react-icons/pi";
import MyJobs from "./Myjobs"

const Overview = () => {
  return (
    <div>
    <div className="grid grid-cols-4 gap-6">
      <div className="bg-blue-100 p-2 h-20 rounded shadow flex items-center justify-between">
        <div className="ml-4 items-center ">
          <p className="text-lg ml-6 font-semibold">58</p>
          <p className="text-gray-600 text-base">Open Jobs</p>
        </div>
        <div className="text-blue-600 bg-white p-2 rounded-full">
          <PiBriefcaseLight size={24} />
        </div>
      </div>
      <div className="bg-pink-100 p-2 h-20 rounded shadow flex items-center justify-between">
        <div className="ml-4">
          <p className="text-lg ml-10 font-semibold">23</p>
          <p className="text-gray-600 text-base">Saved Candidates</p>
        </div>
        <div className="text-blue-600 bg-white p-2 rounded-full">
          <PiBriefcaseLight size={24} />
        </div>
      </div>

     
    </div>
    <div> <MyJobs titleClass="font-semibold"  title="Recently Posted Jobs"/></div>
    </div>
  );
};

export default Overview;
