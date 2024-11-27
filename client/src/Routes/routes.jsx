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


const router = createBrowserRouter([
  //  Auth ROutes......
  { path: "/Login", element: <Login /> },
  { path: "/authendication/Register", element: <Register /> },
  { path: "/payment", element:<PaymentIntegration/>},
  //Private Routes.....

  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Findjob /> },
      { path: "/dashboard", element: <Dashboard/> },
      { path: "FindEmployers", element: <FindEmployers /> },
      { path: "findjob/jobdescription", element: <JobDescription /> },
      
      
]},
  { path: "*", element: <h1>404 Page Not Found</h1> },
]);

export default router;
