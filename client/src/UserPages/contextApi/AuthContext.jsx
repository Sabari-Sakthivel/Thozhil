import React, { createContext, useState, useContext, useEffect } from "react";

// Create the AuthContext
const AuthContext = createContext();

// Provider component to wrap the app
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user,setUser]=useState(null);

  // Persist authentication using localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedToken && storedUser) {
      setIsAuthenticated(true);
      setUser(storedUser);
    }
  }, []);

  // Login function
  const login = (token, userDetails) => {
    setIsAuthenticated(true);
    localStorage.setItem("token", token); 
    localStorage.setItem("user",JSON.stringify(userDetails));
  };

  // Logout function
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token"); 
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated,user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
