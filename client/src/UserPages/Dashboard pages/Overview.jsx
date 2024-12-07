import React,{useState,useEffect} from "react";
import { HiBriefcase } from "react-icons/hi";
import { FaRegBookmark } from "react-icons/fa6";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { Pie } from "react-chartjs-2";
import axios from "axios"
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

const OverviewContent = () => {
  const applied = 30;
  const approved = 20;
  const rejected = 10;

  const data = {
    labels: [
      "Applied Applications",
      "Approved Applications",
      "Rejected Applications",
    ],
    datasets: [
      {
        data: [applied, approved, rejected],
        backgroundColor: ["#4c8bf5", "#63d69f", "#f44336"],
        borderColor: ["#fff", "#fff", "#fff"],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };
  // State to store the username and loading/error states
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/user/getuserdetails",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming you're using a token for auth
            },
          }
        );
        console.log(response);

        // If the response is successful, update the username
        const data = response.data;
        setUsername(data.username); // Update username state with fetched data

        setLoading(false);
      } catch (error) {
        setError("Error fetching user details");
        setLoading(false);
      }
    };

    // Only call getUserDetails if the token exists in localStorage
    if (localStorage.getItem("token")) {
      getUserDetails();
    } else {
      setLoading(false); // If no token, no need to fetch user details
    }
  }, []);

  return (
    <div className="flex-grow scrollbar-hide">
      {/* Main Content */}
      <div className="flex-grow">
        {/* Header */}
        <div>
          {loading ? (
            <h2 className="text-2xl font-bold">Loading...</h2>
          ) : error ? (
            <h2 className="text-2xl font-bold text-red-600">{error}</h2>
          ) : (
            <h2 className="text-2xl font-bold">
              Hello,
              <span className="text-blue-600"> {username || "Guest"}</span>
            </h2>
          )}
          <p className="text-gray-600 mb-2 text-base">
            Here are your daily activities and job alerts.
          </p>
        </div>

        {/* Overview Cards and Pie Chart Wrapper */}
        <div>
          {/* Cards Row */}
          <div className="grid grid-cols-4 gap-6">
            <div className="bg-blue-100 p-2 h-20 rounded shadow flex items-center justify-between">
              <div className="ml-4">
                <p className="text-lg ml-14 font-semibold">0</p>
                <p className="text-gray-600 text-base">Applied Applications</p>
              </div>
              <div className="text-blue-600 bg-white p-2 rounded-full">
                <HiBriefcase size={24} />
              </div>
            </div>

            <div className="bg-yellow-100 p-2 h-20 rounded shadow flex items-center justify-between">
              <div className="ml-4">
                <p className="text-lg ml-14 font-semibold">0</p>
                <p className="text-gray-600 text-base">Saved Applications</p>
              </div>
              <div className="text-yellow-400 bg-white p-2 rounded-full">
                <FaRegBookmark size={24} />
              </div>
            </div>

            <div className="bg-green-100 p-2 h-20 rounded shadow flex items-center justify-between">
              <div className="ml-4">
                <p className="text-lg ml-16 font-semibold">0</p>
                <p className="text-gray-600 text-base">Approved Applications</p>
              </div>
              <div className="text-green-500 bg-white p-2 rounded-full">
                <AiFillLike size={24} />
              </div>
            </div>

            <div className="bg-red-100 p-2 h-20 rounded shadow flex items-center justify-between">
              <div className="ml-4">
                <p className="text-lg ml-16 font-semibold">0</p>
                <p className="text-gray-600 text-base">Rejected Applications</p>
              </div>
              <div className="text-red-500 bg-white p-2 rounded-full">
                <AiFillDislike size={24} />
              </div>
            </div>
          </div>

          {/* Application Tracking and Pie Chart Section */}
          <div className="flex gap-6 mt-6">
            {/* Scheduled Events */}
            <div className="bg-gray-200 text-center rounded shadow p-4 flex-grow">
              <h3 className="font-bold  text-lg mb-2">Scheduled Events</h3>
              <p className="text-gray-600">
                You have no scheduled events for today.
              </p>
            </div>

            {/* Pie Chart */}
            <div className="bg-gray-200 rounded shadow px-4 pt-1 w-fit">
              <h3 className="text-xl font-semibold mb-4">
                Applications Overview
              </h3>
              <div className="flex justify-center">
                <div className="w-[300px] h-[300px] mb-0">
                  <Pie data={data} options={options} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewContent;
