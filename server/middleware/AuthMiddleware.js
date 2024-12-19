const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const { Types } = require('mongoose');

// General authentication middleware
const authenticateUser = async (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization token is required" });
    }

    const token = authHeader.replace("Bearer ", "");
    
    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    // Validate that the decoded ID is a valid MongoDB ObjectId
    if (!Types.ObjectId.isValid(decoded.id)) {
      return res.status(401).json({ message: "Invalid user ID in token" });
    }

    // Find the user in the database using the ID from the token
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User not found. Authentication failed." });
    }

    // Attach the user object to the request for subsequent route handlers
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    // More detailed error message for token errors
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token", error: error.message });
    }
    // Handle token expiry
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired", error: error.message });
    }
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Role-based access control middleware
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied. Unauthorized role." });
    }
    next();
  };
};

module.exports = { authenticateUser, authorizeRoles };
