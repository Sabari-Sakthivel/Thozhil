import React from "react";
import { Routes, Route } from "react-router-dom"; // For routing
import FindJob from "../pages/Findjob";
import FindEmployers from "../pages/FindEmployers";
import JobDescription from "../pages/JobDescription";
import Dashboard from "../pages/DashboardLayout";
import AppliedJobs from "../pages/Dashboard pages/AppliedJobs";
import SavedJobs from "../pages/Dashboard pages/SavedJobs";
import ApplicationTracking from "../pages/Dashboard pages/ApplicationTracking";
import JobAlerts from "../pages/JobAlerts";
import SettingsPage from "../pages/Dashboard pages/Settings";
import Sidebar from "./Dashboard pages/Sidebar";
import { useAuth } from "./contextApi/AuthContext";
import OverviewContent from "./Dashboard pages/Overview";

function Layout() {
  const {logout,user}=useAuth();
  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <Sidebar logout={logout} user={user} />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100 ml-64 scrollbar-hide">
        <Routes>
          <Route index  path="/layout" element={<OverviewContent />} /> 
          {/* <Route path="/layout/dashboard/overviewcontent" element={<OverviewContent/>} /> Default Dashboard */}
          <Route path="/layout/findjob" element={<FindJob />} />
          <Route path="/layout/findemployers" element={<FindEmployers />} />
          <Route path="/layout/findjob/jobdescription" element={<JobDescription />} />
          <Route path="/layout/appliedjobs" element={<AppliedJobs />} />
          <Route path="/layout/savedjobs" element={<SavedJobs />} />
          <Route path="/layout/applicationtracking" element={<ApplicationTracking />} />
          <Route path="/layout/jobalerts" element={<JobAlerts />} />
          <Route path="/layout/settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default Layout;
