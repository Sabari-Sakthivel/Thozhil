const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const Company= require("../models/CompanyModel")
const { Types } = require('mongoose');

// General authentication middleware
const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization token is required" });
    }

    const token = authHeader.replace("Bearer ", "");

    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!Types.ObjectId.isValid(decoded.id)) {
      return res.status(401).json({ message: "Invalid ID in token" });
    }

    // Try to find the user by ID
    const user = await User.findById(decoded.id);

    if (user) {
      req.user = user; // Attach user to request
      return next();
    }

    // If user not found, try to find the company by ID
    const company = await Company.findById(decoded.id);

    if (company) {
      req.company = company; // Attach company to request
      return next();
    }

    // If neither user nor company is found
    return res.status(404).json({ message: "User or company not found. Authentication failed." });
  } catch (error) {
    console.error("Authentication error:", error.message);
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token", error: error.message });
    }
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
