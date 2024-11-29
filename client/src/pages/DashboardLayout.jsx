import React, { useState } from "react";
import {
  FiLayers,
  FiBookmark,
  FiBell,
  FiSettings,
  FiUsers,
  FiBriefcase as FiJobs,
  FiMapPin,
} from "react-icons/fi";
import { HiBriefcase } from "react-icons/hi";
import { LuLogOut } from "react-icons/lu";
import FindJob from "./Findjob"
import OverviewContent from "./Dashboard pages/Overview";
import AppliedJobs from "./Dashboard pages/AppliedJobs";
import SettingsPage from "./Dashboard pages/Settings";
import ApplicationTracking from "./Dashboard pages/ApplicationTracking";
import SavedJobs from "./Dashboard pages/SavedJobs";

function Dashboard() {
  const [activeRow, setActiveRow] = useState("Overview");

  const menuItems = [
    { id: "Overview", icon: <FiLayers size={22} />, label: "Dashboard" },
    { id: "Jobs", icon: <FiJobs size={22} />, label: "Jobs" },
    {
      id: "FindEmployers",
      icon: <FiUsers size={22} />,
      label: "Find Employers",
    },
    {
      id: "AppliedJobs",
      icon: <HiBriefcase size={22} />,
      label: "Applied Applications",
    },
    {
      id: "SavedJobs",
      icon: <FiBookmark size={22} />,
      label: "Saved Applications",
    },
    {
      id: "ApplicationTracking",
      icon: <FiMapPin size={22} />,
      label: "Application Tracking",
    },
    { id: "JobAlerts", icon: <FiBell size={22} />, label: "Job Alerts" },
    { id: "Settings", icon: <FiSettings size={22} />, label: "Settings" },
  ];

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-4 flex flex-col h-full fixed top-0">
        <nav className="flex flex-col h-full w-full justify-between">
          <ul className="pt-20 w-full">
            {menuItems.map((item) => (
              <li
                key={item.id}
                className={`py-2 px-4 flex items-center gap-3 rounded cursor-pointer ${
                  activeRow === item.id
                    ? "bg-blue-200 text-blue-500"
                    : "hover:bg-blue-200 hover:text-blue-500 text-gray-500"
                }`}
                onClick={() => setActiveRow(item.id)}
              >
                <span>{item.icon}</span>
                {item.label}
              </li>
            ))}
          </ul>
          <div className="mt-auto w-full">
            <button className="w-full flex items-center gap-3 py-2 px-4 text-gray-500 rounded hover:bg-blue-200 hover:text-blue-500 cursor-pointer">
              <LuLogOut size={22} />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100 ml-64 scrollbar-hide">
        {activeRow === "Overview" && <OverviewContent />}
        {activeRow === "Jobs" && <FindJob/>}
        {activeRow === "FindEmployers" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Find Employers</h2>
            <p>Search for employers and learn more about their job openings.</p>
          </div>
        )}
        {activeRow === "AppliedJobs" && <AppliedJobs />}
        {activeRow === "SavedJobs" && <SavedJobs/>}
        {activeRow === "ApplicationTracking" && <ApplicationTracking/>}
        {activeRow === "JobAlerts" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Job Alerts</h2>
            <p>Manage your job alerts and notifications here.</p>
          </div>
        )}
        {activeRow === "Settings" && <SettingsPage />}
      </div>
    </div>
  );
}

export default Dashboard;
