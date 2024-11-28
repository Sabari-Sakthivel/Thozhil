import React, { useState } from "react";
import {
  FiLayers,
  FiBriefcase,
  FiBookmark,
  FiBell,
  FiSettings,
} from "react-icons/fi";
import { LuLogOut } from "react-icons/lu";
import OverviewContent from "./Dashboard pages/Overview";

function Dashboard() {
  const [activeRow, setActiveRow] = useState("Overview");

  const menuItems = [
    { id: "Overview", icon: <FiLayers size={22} />, label: "Overview" },
    {
      id: "AppliedJobs",
      icon: <FiBriefcase size={22} />,
      label: "Applied Jobs",
    },
    { id: "SavedJobs", icon: <FiBookmark size={22} />, label: "Saved Jobs" },
    { id: "JobAlerts", icon: <FiBell size={22} />, label: "Job Alerts" },
    { id: "Settings", icon: <FiSettings size={22} />, label: "Settings" },
  ];

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-4 flex flex-col h-full fixed top-0  ">
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
        {activeRow === "AppliedJobs" && <div>Applied Jobs Page</div>}
        {activeRow === "SavedJobs" && <div>Saved Jobs Page</div>}
        {activeRow === "JobAlerts" && <div>Job Alerts Page</div>}
        {activeRow === "jmmmSettings" && <div>Settings Page</div>}
      </div>
    </div>
  );
}

export default Dashboard;
