import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../../UserPages/Header";
import Footer from "../../UserPages/Footer";
import Sidebar from "../../UserPages/Dashboard pages/Sidebar";

const Layout = () => {
  const location = useLocation();
  const noFooterRoutes = ["/layout", "/layout/dashboard"];  
  const hideFooter = noFooterRoutes.some(route => location.pathname.startsWith(route));

  return (
    <div className="flex flex-col min-h-screen">
      {/* Always render Header */}
      <Header />
      <Sidebar/>
    
      {/* Main Content */}
      <main className="flex-1 ml-64 px-5 pt-5">
        <Outlet />
      </main>

      {/* Conditionally render Footer */}
      {!hideFooter && <Footer />}
    </div>
  );
};

export default Layout;
