import React, { useState } from "react";
import {
  FiBookmark,
  FiSettings,
} from "react-icons/fi";
import { HiUser } from "react-icons/hi";
import { LuLogOut } from "react-icons/lu";
import { useNavigate, useLocation } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { FiPlusCircle } from "react-icons/fi";
import { IoBriefcaseOutline } from "react-icons/io5";

const EmployerSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false); // State for logout popup

  // Employer-specific menu items
  const menuItems = [
    { id: "overview", icon: <MdOutlineDashboard size={22} />, label: "Dashboard", path: "/EmployerDashboard" },
    { id: "profile", icon: <HiUser size={22} />, label: "Profile", path: "/EmployerDashboard/employerprofile" },
    { id: "postjob", icon: <FiPlusCircle size={22} />, label: "Post a Job", path: "/EmployerDashboard/postjob" },
    { id: "myjobs", icon: <IoBriefcaseOutline size={22} />, label: "My Jobs", path: "/EmployerDashboard/myjobs" },
    { id: "savedcandidates", icon: <FiBookmark size={22} />, label: "Saved Candidates", path: "/EmployerDashboard/savedcandidates" },
    { id: "settings", icon: <FiSettings size={22} />, label: "Settings", path: "/EmployerDashboard/employersettings" },
  ];

  const handleLogout = () => {
    console.log("Logout confirmed.");
    localStorage.removeItem("token");
    setIsLogoutOpen(false); // Close popup
    navigate("/"); // Navigate to the home page or login page after logout
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
                  ? "bg-blue-200 text-blue-500 border-l-4 border-blue-500"
                  : "hover:bg-blue-200 hover:text-blue-500 text-gray-500"
              }`}
              onClick={() => navigate(item.path)}
            >
              <span>{item.icon}</span>
              {item.label}
            </li>
          ))}
        </ul>

        {/* Logout Button with Hover and Active Blue Line */}
        <div className="mt-auto w-full">
          <button
            onClick={() => setIsLogoutOpen(true)} // Open logout popup
            className={`w-full flex items-center gap-3 py-2 px-4 text-gray-500 rounded hover:bg-blue-200 hover:text-blue-500 cursor-pointer ${
              location.pathname === "/EmployerDashboard/logout" // This path should be for the logout page
                ? "border-l-4 border-blue-500"
                : "hover:border-l-4 hover:border-blue-500"
            }`}
          >
            <LuLogOut size={22} />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      {/* Logout Confirmation Popup */}
      {isLogoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h2 className="text-lg font-semibold text-gray-800">Confirm Logout</h2>
            <p className="mt-2 text-sm text-gray-600">
              Are you sure you want to log out?
            </p>
            <div className="mt-4 flex justify-end space-x-3">
              <button
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                onClick={() => setIsLogoutOpen(false)} // Close popup
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600"
                onClick={handleLogout} // Confirm logout
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployerSidebar;
