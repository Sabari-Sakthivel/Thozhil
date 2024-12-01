import React from "react";
import { Navigate } from "react-router-dom";

// Mock authentication function (replace this with your actual authentication logic)
const isAuthenticated = () => {
  // Check if the user is authenticated (e.g., check token, session, etc.)
  return !!localStorage.getItem("token"); // Example check
};

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
