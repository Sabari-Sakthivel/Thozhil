import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import Header from "../../UserPages/Header";
import Footer from "../../UserPages/Footer";
import Sidebar from "../../UserPages/Dashboard pages/Sidebar";

const CandidateLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Token expiry check
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
          // Token expired
          localStorage.removeItem("token");
          navigate("/login");
        }
      } catch (error) {
        // Invalid token
        localStorage.removeItem("token");
        navigate("/login");
      }
    } else {
      // No token at all
      navigate("/login");
    }
  }, []);

  // Routes where footer should be hidden
  const noFooterRoutes = ["/candidatelayout", "/candidatelayout/dashboard"];
  const hideFooter = noFooterRoutes.some(route =>
    location.pathname.startsWith(route)
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Always render Header */}
      <Header />
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 ml-64 px-5 pt-5">
        <Outlet />
      </main>

      {/* Conditionally render Footer */}
      {!hideFooter && <Footer />}
    </div>
  );
};

export default CandidateLayout;
