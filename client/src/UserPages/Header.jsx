import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBell, FaSearch } from "react-icons/fa";
import axios from "axios";

const Header = () => {
  const location = useLocation();

  const isUserPage = location.pathname.startsWith("/candidatelayout");
  const isLandingPage = location.pathname === "/" || location.pathname === "/home";

  const [username, setUsername] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [companyName, setCompanyName] = useState(null);
  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Candidate Details
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get("http://localhost:4000/user/getuserdetails", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = response.data;
        setUsername(data.username);

        if (data.profilePicture) {
          const formattedPath = data.profilePicture.replace(/\\/g, "/");
          setProfilePicture(`http://localhost:4000/${formattedPath}`);
        }
      } catch (err) {
        setError("Error fetching user details");
      } finally {
        setLoading(false);
      }
    };

    if (isUserPage && localStorage.getItem("token")) {
      fetchUserDetails();
    } else {
      setLoading(false);
    }
  }, [isUserPage]);

  // Fetch Company Details
  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const response = await axios.get("http://localhost:4000/company/getcompanydata", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const companyDetails = response.data.companyDetails;
        console.log("Company Details:", companyDetails);

        setCompanyName(companyDetails.CompanyName);
        if (companyDetails.logo) {
          setLogo(companyDetails.logo); // Already a full URL from backend
        }
      } catch (err) {
        console.error("Error fetching company details:", err);
        setError("Error fetching company details");
      }
    };

    if (!isUserPage && !isLandingPage && localStorage.getItem("token")) {
      fetchCompanyDetails();
    }
  }, [isUserPage, isLandingPage]);

  return (
    <header className="bg-white shadow-md py-4 sticky top-0 z-50 pr-0">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <div className="text-2xl ml-7 font-bold">
          <Link to="/login" className="text-blue-500 text-4xl">
            JobHire
          </Link>
        </div>

        {/* Search bar only on landing page */}
        {isLandingPage && (
          <div className="flex justify-center items-center flex-grow">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for jobs, skills, or companies..."
                className="w-96 pl-10 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>
        )}

        {/* Right-side buttons/icons */}
        <div className="flex items-center space-x-6">
          {isLandingPage ? (
            <>
              <Link to="/login">
                <button className="px-4 py-2 text-blue-600 hover:text-white hover:bg-blue-500 border border-gray-400 bg-white rounded-md font-semibold">
                  Sign In
                </button>
              </Link>
              <Link to="/login">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md font-semibold border border-gray-400 hover:text-blue-500 hover:bg-white">
                  Post A Job
                </button>
              </Link>
            </>
          ) : (
            <>
              <FaBell className="text-gray-600 text-2xl" />

              {/* Company Info */}
              {!isUserPage && !isLandingPage && companyName && (
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300">
                    <img
                      src={logo || "https://via.placeholder.com/40"}
                      alt="Company Logo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-sm font-medium text-gray-700">
                    {companyName}
                  </div>
                </div>
              )}

              {/* Candidate Info */}
              {isUserPage && (
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300">
                    <img
                      src={profilePicture || "https://via.placeholder.com/40"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col items-end">
                    {loading ? (
                      <p className="text-sm text-gray-500">Loading...</p>
                    ) : error ? (
                      <p className="text-sm text-red-500">{error}</p>
                    ) : username ? (
                      <p className="text-sm text-gray-700">{username}</p>
                    ) : (
                      <p className="text-sm text-gray-500">Guest</p>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
