// EmployerDashboard.jsx
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../../UserPages/Header";
import Footer from "../../UserPages/Footer";
import EmployerSidebar from "../../EmployerPages/EmployerSidebar";

const EmployerDashboard = () => {
  const location = useLocation();
  const noFooterRoutes = ["/EmployerDashboard", "/EmployerDashboard/dashboard"];
  const hideFooter = noFooterRoutes.some(route =>
    location.pathname.startsWith(route)
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <EmployerSidebar />
      <main className="flex-1 ml-64 px-5 pt-5">
        <Outlet />
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
};

export default EmployerDashboard;
