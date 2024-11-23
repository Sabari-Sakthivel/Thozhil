import React from "react";
import { createBrowserRouter } from "react-router-dom";
// import Login from "../compoonents/authendication/Login"
// import Register from "../compoonents/authendication/Register"
import Findjob from "../pages/Findjob"
import Layout from "../compoonents/Layout/Layout"
import Dashboard from "../pages/Dashboard";

const router = createBrowserRouter([
  // { path: "/", element: <Login /> },
  // { path: "/authendication/Register", element: <Register /> },

  {path: "/", element: <Layout/>,
    children:[
        { index: true, element: <Findjob/> },
        {path:'/Pages/Dasboard', element:<Dashboard/>},
    ]   },

  { path: "*", element: <h1>404 Page Not Found</h1> },
  

]);

export default router;
