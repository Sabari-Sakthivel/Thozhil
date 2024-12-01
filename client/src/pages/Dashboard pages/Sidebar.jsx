import React from "react";
import { FiLayers, FiBookmark, FiBell, FiSettings, FiUsers, FiBriefcase as FiJobs, FiMapPin } from "react-icons/fi";
import { HiBriefcase } from "react-icons/hi";
import { LuLogOut } from "react-icons/lu";
import { useNavigate, useLocation } from "react-router-dom"; // useLocation to track active route

const Sidebar = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get the current route

  const menuItems = [
    { id: "dashboard", icon: <FiLayers size={22} />, label: "Dashboard", path: "/layout" },
    { id: "Jobs", icon: <FiJobs size={22} />, label: "Jobs", path: "/layout/findjob" },
    { id: "FindEmployers", icon: <FiUsers size={22} />, label: "Find Employers", path: "/layout/findemployers" },
    { id: "AppliedJobs", icon: <HiBriefcase size={22} />, label: "Applied Applications", path: "/layout/appliedjobs" },
    { id: "SavedJobs", icon: <FiBookmark size={22} />, label: "Saved Applications", path: "/layout/savedjobs" },
    { id: "ApplicationTracking", icon: <FiMapPin size={22} />, label: "Application Tracking", path: "/layout/applicationtracking" },
    { id: "JobAlerts", icon: <FiBell size={22} />, label: "Job Alerts", path: "/layout/jobalerts" },
    { id: "Settings", icon: <FiSettings size={22} />, label: "Settings", path: "/layout/settings" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); // Redirect to home page after logout
  };

  return (
    <div className="w-64 bg-white shadow-md p-4 flex flex-col h-full fixed top-0">
      <nav className="flex flex-col h-full w-full justify-between">
        <ul className="pt-20 w-full">
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={`py-2 px-4 flex items-center gap-3 rounded cursor-pointer ${
                location.pathname === item.path
                  ? "bg-blue-200 text-blue-500"
                  : "hover:bg-blue-200 hover:text-blue-500 text-gray-500"
              }`}
              onClick={() => navigate(item.path)} // Navigate to the selected route
            >
              <span>{item.icon}</span>
              {item.label}
            </li>
          ))}
        </ul>
        <div className="mt-auto w-full">
          <h1>Welcome, {user?.name || "Guest"}</h1>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 py-2 px-4 text-gray-500 rounded hover:bg-blue-200 hover:text-blue-500 cursor-pointer"
          >
            <LuLogOut size={22} />
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
