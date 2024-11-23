import React from 'react';
import { Link } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-white shadow-md py-4 sticky top-0 z-50 ">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Title */}
        <div className="text-2xl font-bold">
          <Link to="/" className="text-blue-600 text-4xl">JobHire</Link>
        </div>

        {/* Navigation pages */}
        <nav>
          <ul className="flex space-x-8">
            <li>
              <Link to="/" className="text-gray-500 font-bold hover:text-blue-600">Find Jobs</Link>
            </li>
            
            <li>
              <Link to="/Pages/Dasboard" className="text-gray-500 font-bold hover:text-blue-600">Dashboard</Link>
            </li>
            <li>
              <Link to="Find Employers" className="text-gray-500 font-bold hover:text-blue-600">Find Employers</Link>
            </li>
          </ul>
        </nav>

        {/* Right side: Notification icon and Profile */}
        <div className="flex items-center space-x-6">
          {/* Notification Icon */}
          <div className="relative">
            <FaBell className="text-gray-600 text-2xl" />
            <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
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
            <Link to="/Profile" className="text-gray-500 font-bold hover:text-blue-600">
              Profile
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
