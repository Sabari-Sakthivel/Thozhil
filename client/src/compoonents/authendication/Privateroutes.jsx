import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// PrivateRoute component to protect private routes
const PrivateRoute = () => {
  const token = localStorage.getItem('authToken'); // Check for auth token in localStorage

  // If no token, redirect to login page
  if (!token) {
    return <Navigate to="/authendication/Login" replace />;
  }

  // If token exists, render the child components (protected route)
  return <Outlet />;
};

export default PrivateRoute;
