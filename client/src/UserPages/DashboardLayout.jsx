import React from "react";
import { Routes, Route } from "react-router-dom"; // For routing
import FindJob from "../UserPages/Findjob";
import JobDescription from "../UserPages/JobDescription";
import AppliedJobs from "../UserPages/Dashboard pages/AppliedJobs";
import SavedJobs from "../UserPages/Dashboard pages/SavedJobs";
import ApplicationTracking from "../UserPages/Dashboard pages/ApplicationTracking";
import JobAlerts from "../UserPages/JobAlerts";
import SettingsPage from "../UserPages/Dashboard pages/Settings";
import Sidebar from "./Dashboard pages/Sidebar";
import { useAuth } from "./contextApi/AuthContext";
import OverviewContent from "./Dashboard pages/Overview";

function candidatelayout() {
  const {logout,user}=useAuth();
  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <Sidebar logout={logout} user={user} />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100 ml-64 scrollbar-hide">
        <Routes>
          <Route index  path="/candidatecandidatecandidatelayout" element={<OverviewContent />} /> 
          <Route path="/candidatecandidatelayout/findjob" element={<FindJob />} />
          <Route path="/candidatelayout/findjob/jobdescription" element={<JobDescription />} />
          <Route path="/candidatelayout/appliedjobs" element={<AppliedJobs />} />
          <Route path="/candidatelayout/savedjobs" element={<SavedJobs />} />
          <Route path="/candidatelayout/applicationtracking" element={<ApplicationTracking />} />
          <Route path="/candidatelayout/jobalerts" element={<JobAlerts />} />
          <Route path="/candidatelayout/settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default candidatelayout;
