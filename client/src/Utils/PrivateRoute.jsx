import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("authToken"); // Example logic
  const userRole = localStorage.getItem("userRole"); // "free" or "premium"

  if (!isAuthenticated) {
    return <Navigate to="/" replace />; // Redirect to login page
  }

  // Additional role checks (if needed)
  if (userRole !== "premium" && window.location.pathname.includes("/pages/findjob/job-details")) {
    return <h1 className="text-center mt-10 text-red-600">This page is only available for premium users.</h1>;
  }

  return children;
};

export default PrivateRoute;
