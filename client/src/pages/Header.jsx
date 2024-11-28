import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBell } from "react-icons/fa";

const Header = () => {
  const location = useLocation();

  // Function to check if the link is active
  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white shadow-md py-4 sticky top-0 z-50 overflow-y-auto scrollbar-hide">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Title */}
        <div className="text-2xl font-bold">
          <Link to="/" className="text-blue-600 text-4xl">
            JobHire
          </Link>
        </div>

        {/* Navigation pages */}
        <nav>
          <ul className="flex space-x-8">
            <li>
              <Link
                to="/"
                className={`font-bold hover:text-blue-600 ${
                  isActive("/") ? "text-blue-600" : "text-gray-500"
                }`}
              >
                Find Jobs
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className={`font-bold hover:text-blue-600 ${
                  isActive("/dashboard") ? "text-blue-600" : "text-gray-500"
                }`}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/find-employers"
                className={`font-bold hover:text-blue-600 ${
                  isActive("/find-employers")
                    ? "text-blue-600"
                    : "text-gray-500"
                }`}
              >
                Find Employers
              </Link>
            </li>
           
          </ul>
        </nav>

        {/* Right side: Notification icon and Profile */}
        <div className="flex items-center space-x-6">
          {/* Notification Icon */}
          <div className="relative">
            <FaBell className="text-gray-600 text-2xl" />
          </div>

          {/* Profile Icon */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300">
              <img
                src="https://via.placeholder.com/40"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <Link
              to="/profile"
              className={`font-bold hover:text-blue-600 ${
                isActive("/profile") ? "text-blue-600" : "text-gray-500"
              }`}
            >
              Profile
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
