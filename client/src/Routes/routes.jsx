import React from "react";
import { createBrowserRouter } from "react-router-dom";
// import Login from "../compoonents/authendication/Login"
import Register from "../compoonents/authendication/Register";
import Findjob from "../pages/Findjob";
import Layout from "../compoonents/Layout/Layout";
// import PrivateRoute from "../Utils/Privateroute";
import Dashboard from "../pages/Dashboard";
import FindEmployers from "../pages/FindEmployers";
import Pricingplans from "../pages/PricingPlans";
import JobDescription from "../pages/JobDescription";


const router = createBrowserRouter([
  //  Auth ROutes......
  // { path: "/", element: <Login /> },
  { path: "authendication/Register", element: <Register /> },

  //Private Routes.....

  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Findjob /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "FindEmployers", element: <FindEmployers /> },
      { path: "Pricing&Plans", element: <Pricingplans /> },
      { path: "findjob/jobdescription", element: <JobDescription /> },
      
]},
  { path: "*", element: <h1>404 Page Not Found</h1> },
]);

export default router;
