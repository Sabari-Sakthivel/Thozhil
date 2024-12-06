const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const protectUser = async (req, res, next) => {
  let token;

  try {
    // Check if the Authorization header exists and starts with 'Bearer'
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // Extract the token from the Authorization header
      token = req.headers.authorization.split(" ")[1];

      // Verify the token using the secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      // Find the user by ID from the token payload
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res
          .status(404)
          .json({ message: "User not found, token is invalid" });
      }

      // Attach the user information to the request object
      req.user = user;

      // Proceed to the next middleware or route handler
      next();
    } else {
      // No token provided
      return res
        .status(401)
        .json({ message: "Not authorized, no token provided" });
    }
  } catch (error) {
    console.error("Error verifying token:", error.message);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired" });
    }

    if (error.name === "JsonWebTokenError") {
      return res
        .status(401)
        .json({ message: "Token is invalid or tampered with" });
    }

    // General error fallback
    return res
      .status(500)
      .json({ message: "Server error while verifying token" });
  }
};

module.exports = { protectUser };
