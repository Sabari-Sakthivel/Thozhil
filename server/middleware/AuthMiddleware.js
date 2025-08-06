const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const Company = require("../models/CompanyModel");
const { Types } = require("mongoose");

const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization token is required" });
    }

    const token = authHeader.replace("Bearer ", "").trim();
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const id = decoded._id || decoded.id;

    if (!Types.ObjectId.isValid(id)) {
      return res.status(401).json({ message: "Invalid ID in token" });
    }

    // First, try to find a user
    const user = await User.findById(id);
    if (user) {
      req.user = user;
      return next();
    }

    // If not a user, try to find a company
    const company = await Company.findById(id);
    if (company) {
      req.company = company;
      return next();
    }

    // Neither user nor company found
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
    const role = req.user?.role || req.company?.role;
    if (!roles.includes(role)) {
      return res.status(403).json({ message: "Access denied. Unauthorized role." });
    }
    next();
  };
};

module.exports = { authenticateUser, authorizeRoles };
