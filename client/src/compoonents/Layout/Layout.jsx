import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../../pages/Header";
import Footer from "../../pages/Footer";
import Sidebar from "../../pages/Dashboard pages/Sidebar";

const Layout = () => {
  const location = useLocation();

  // Define routes where the footer should NOT appear
  const noFooterRoutes = ["/layout", "/layout/dashboard"];  // Add "/layout/dashboard" or adjust as necessary

  // Check if the current route starts with "/layout" or is in the list
  const hideFooter = noFooterRoutes.some(route => location.pathname.startsWith(route));

  return (
    <div className="flex flex-col min-h-screen">
      {/* Always render Header */}
      <Header />
      <Sidebar/>
    
      {/* Main Content */}
      <main className="flex-1 ml-64">
        <Outlet />
      </main>

      {/* Conditionally render Footer */}
      {!hideFooter && <Footer />}
    </div>
  );
};

export default Layout;
