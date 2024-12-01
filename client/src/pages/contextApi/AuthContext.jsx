import React, { createContext, useState, useContext, useEffect } from "react";

// Create the AuthContext
const AuthContext = createContext();

// Provider component to wrap the app
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Persist authentication using localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setIsAuthenticated(true);
    }
  }, []);

  // Login function
  const login = (token) => {
    setIsAuthenticated(true);
    localStorage.setItem("token", token); // Persist token
  };

  // Logout function
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token"); // Clear persisted token
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
