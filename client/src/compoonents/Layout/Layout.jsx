import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../../pages/Header";
import Footer from "../../pages/Footer";

const Layout = () => {
  const location = useLocation();

  // Define routes where the footer should NOT appear
  const noFooterRoutes = ["/"];

  // Check if the current route is in the list
  const hideFooter = noFooterRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Always render Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Conditionally render Footer */}
      {!hideFooter && <Footer />}
    </div>
  );
};

export default Layout;
