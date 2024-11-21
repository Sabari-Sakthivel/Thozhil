import React from 'react';
import { Link } from 'react-router-dom';
import { FaBell } from 'react-icons/fa'; 

const Header = () => {
  return (
    <header className="bg-white  shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Title */}
        <div className="text-2xl font-bold">
          <Link to="/" className="text-blue-600 text-4xl ">JobHire</Link>
        </div>

        {/* Navigation pages */}
        <nav>
          <ul className="flex space-x-8">
            <li>
              <Link to="/" className="text-gray-500 font-bold hover:text-blue-600">Home</Link>
            </li>
            <li>
              <Link to="/jobs" className="text-gray-500 font-bold hover:text-blue-600">Jobs</Link>
            </li>
            <li>
              <Link to="Internships" className="text-gray-500 font-bold hover:text-blue-600">Internships</Link>
            </li>
            <li>
              <Link to="/how-it-works" className="text-gray-500 font-bold hover:text-blue-600">How It Works</Link>
            </li>
            <li>
              <Link to="/contact" className="text-gray-500 font-bold hover:text-blue-600">Contact</Link>
            </li>
          </ul>
        </nav>

        {/* Right side: Notification icon and Auth buttons */}
        <div className="flex items-center space-x-6">
          {/* Notification Icon */}
          <div className="relative">
            <FaBell className="text-blue-600  text-2xl" />
            <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
          </div>

          {/* Login/Register Buttons */}
          <div>
            <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white  py-2 px-4 rounded-lg  hover:text-gray-900">Login/Register</Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
