import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "../compoonents/authendication/Login"
import Register from "../compoonents/authendication/Register"


const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/authendication/Register", element: <Register /> },
]);

// const router = createBrowserRouter([

//   {path:"/", element:<Login/>,},
//   {path:"authendication/Register", element:<Register/>,},

//   // {path: "/", element: <Layout/>,
//   //   children:[
//   //       { index: true, element: <Home /> },
//   //   ]   },

//   { path: "*", element: <h1>404 Page Not Found</h1> },
  

// ]);

export default router;
