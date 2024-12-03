import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import axios from 'axios';  // Import axios for the API call

const Header = () => {
  const location = useLocation();
  
  // State to store the username and loading/error states
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const response = await axios.get('http://localhost:4000/user/getuserdetails', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming you're using a token for auth
          },
        });
        console.log(response);

        // If the response is successful, update the username
        const data = response.data;
        setUsername(data.username); // Update username state with fetched data

        setLoading(false);
      } catch (error) {
        setError('Error fetching user details');
        setLoading(false);
      }
    };

    // Only call getUserDetails if the token exists in localStorage
    if (localStorage.getItem('token')) {
      getUserDetails();
    } else {
      setLoading(false); // If no token, no need to fetch user details
    }
  }, []);  // Empty dependency array means this runs on mount

  // Function to check if the link is active
  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white shadow-md py-2 sticky top-0 z-50 overflow-y-auto scrollbar-hide">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Title */}
        <div className="text-2xl font-bold">
          <Link to="/" className="text-blue-600 text-4xl">
            JobHire
          </Link>
        </div>

        {/* Right side: Notification icon and Profile */}
        <div className="flex items-center space-x-6">
          {/* Notification Icon */}
          <div className="relative">
            <FaBell className="text-gray-600 text-2xl" />
          </div>

          {/* Profile Section */}
          <div className="flex items-center space-x-3">
            {/* Display profile image */}
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300">
              <img
                src="https://via.placeholder.com/40"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Show username if user is logged in */}
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
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
