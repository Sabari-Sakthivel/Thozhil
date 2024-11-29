import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "../compoonents/authendication/Login"
import Register from "../compoonents/authendication/Register";
import Findjob from "../pages/Findjob";
import Layout from "../compoonents/Layout/Layout";
// import PrivateRoute from "../Utils/Privateroute";
import Dashboard from "../pages/DashboardLayout";
import FindEmployers from "../pages/FindEmployers";
import JobDescription from "../pages/JobDescription";
import PaymentIntegration from "../pages/PaymentIntegration"
import OtpVerification from "../compoonents/authendication/OtpVerify";


const router = createBrowserRouter([
  //  Auth ROutes......
  { path: "/authendication/Login", element: <Login /> },
  { path: "/authendication/Register", element: <Register /> },
  { path: "/payment", element:<PaymentIntegration/>},
  { path: "/otpverify", element:<OtpVerification/>},
  //Private Routes.....

  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "FindJob", element: <Findjob/> },
      { path: "FindEmployers", element: <FindEmployers /> },
      { path: "findjob/jobdescription", element: <JobDescription /> },
      
      
]},
  { path: "*", element: <h1>404 Page Not Found</h1> },
]);

export default router;
