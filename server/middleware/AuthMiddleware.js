const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

// General authentication middleware
const authenticateUser = async (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization token is required" });
    }

    const token = authHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Decode and verify the token

    // Find the user in the database using the ID from the token
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User not found. Authentication failed." });
    }

    // Attach user object to the request for use in subsequent handlers
    req.user = user;

    next(); // Continue to the next middleware or route handler
  } catch (error) {
    console.error("Authentication error:", error.message);
    return res.status(401).json({ message: "Authentication failed", error: error.message });
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
