const jwt = require('jsonwebtoken');

const companyMiddleware = (req, res, next) => {
  // Get token from Authorization header
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ success: false, message: "No token provided" });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Failed to authenticate token" });
    }

    // Attach userId from the token to the request object
    req.userId = decoded.userId;
    next(); // Pass control to the next middleware or route handler
  });
};

module.exports = companyMiddleware;
