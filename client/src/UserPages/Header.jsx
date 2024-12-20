import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBell, FaSearch } from "react-icons/fa";
import axios from 'axios';

const Header = ({ isLandingpage, isUserPage }) => {
  const location = useLocation();

  // State to store the username, company name, logo, and loading/error states
  const [username, setUsername] = useState(null);
  const [companyName, setCompanyName] = useState(null); // State to store the company name
  const [logo, setLogo] = useState(null); // State to store the logo
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only fetch user details if we're on a user page
    if (isUserPage && localStorage.getItem('token')) {
      const getUserDetails = async () => {
        try {
          const response = await axios.get('http://localhost:4000/user/getuserdetails', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          });
          console.log(response);
          const data = response.data;
          setUsername(data.username);
          setLoading(false);
        } catch (error) {
          setError('Error fetching user details');
          setLoading(false);
        }
      };

      getUserDetails();
    } else {
      setLoading(false); // No need to fetch user details on employer or landing pages
    }
  }, [isUserPage]);

  useEffect(() => {
    // Fetch company name and logo only when on employer page
    if (!isUserPage && localStorage.getItem('token')) {
      const getCompanyDetails = async () => {
        try {
          const response = await axios.get('http://localhost:4000/company/getcompanydata', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          });
          const companyDetails = response.data.companyDetails;
          setCompanyName(companyDetails.CompanyName); // Set the company name
          setLogo(companyDetails.logo); // Set the logo
        } catch (error) {
          setError('Error fetching company details');
        }
      };

      getCompanyDetails();
    }
  }, [isUserPage]); // Only run when isUserPage changes

  // Function to check if the link is active
  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white shadow-md py-4 sticky top-0 z-50 overflow-y-auto pr-0 scrollbar-hide">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Title */}
        <div className="text-2xl ml-7 font-bold">
          <Link to="/login" className="text-blue-500 text-4xl">
            JobHire
          </Link>
        </div>

        {/* Center: Search Bar (Only for Landing Page) */}
        {isLandingpage && (
          <div className="flex justify-center items-center flex-grow">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for jobs, skills, or companies..."
                className="w-96 pl-10 items-center px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>
        )}

        {/* Right side: Render different elements based on `isLandingpage` */}
        <div className="flex items-center space-x-6">
          {isLandingpage ? (
            // Show "Sign In" and "Post a Job" buttons for Landing Page
            <>
              <button className="px-4 py-2 text-blue-600 hover:text-white hover:bg-blue-500 hover border border-gray-400 bg-white rounded-md font-semibold">
                <Link to="/login">Sign In</Link>
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md font-semibold border border-gray-400 hover:text-blue-500 hover:bg-white">
                <Link to="/login">Post A Job</Link>
              </button>
            </>
          ) : (
            // Show Notification and Profile for user pages or employer pages
            <>
              {/* Notification Icon (Visible for employer and user pages) */}
              <div className="relative">
                <FaBell className="text-gray-600 text-2xl" />
              </div>

              {/* Profile Section */}
              <div className="flex items-center space-x-3">
                {/* Display company name and logo for employer page */}
                {!isUserPage && companyName && logo && (
                  <>
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300">
                      <img
                        src={logo}
                        alt="Company Logo"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-sm font-medium text-gray-700">
                      {companyName} {/* Display the company name */}
                    </div>
                  </>
                )}

                {/* Display profile image and username for user pages */}
                {isUserPage && (
                  <>
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300">
                      <img
                        src="https://via.placeholder.com/40"
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col items-end">
                      {loading ? (
                        <p className="text-sm font-medium text-gray-500">Loading...</p>
                      ) : error ? (
                        <p className="text-sm font-medium text-red-500">{error}</p>
                      ) : username ? (
                        <p className="text-sm font-medium text-gray-700">
                          {username} {/* Display the username */}
                        </p>
                      ) : (
                        <p className="text-sm font-medium text-gray-500">Guest</p>
                      )}
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
