import React from "react";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./UserPages/contextApi/AuthContext"; 
import router from "./Routes/routes";
import './App.css'; 

function App() {
  return (
    <React.StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </React.StrictMode>
  );
}

export default App;
