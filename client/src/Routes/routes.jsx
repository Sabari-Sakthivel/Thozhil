import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home"; 
import Layout from "../compoonents/Layout/LandingpageLayout";

const router = createBrowserRouter([
  {path: "/", element: <Layout/>,
    children:[
        { index: true, element: <Home /> },
    ]   },
  

]);

export default router;
