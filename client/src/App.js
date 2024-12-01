import React from "react";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./pages/contextApi/AuthContext"; // Import AuthProvider
import router from "./Routes/routes"; // Import your router

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
