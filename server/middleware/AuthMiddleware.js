const jwt = require('jsonwebtoken');
const User = require('../models/UserModel'); // Adjust according to your user model

const authenticateUser = async (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization token is required' });
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); 
    
    console.log(decoded)// Decode and verify the token
    
    // Find the user in the database using the ID from the token
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'User not found. Authentication failed.' });
    }

    // Attach user and userId to the request object
    req.user = user; // Full user object for potential use elsewhere
    req.profile = { userId: user._id }; // userId specifically for profile-related tasks

    next(); // Continue to the next middleware or route handler
  } catch (error) {
    console.error('Authentication error:', error.message);
    return res.status(401).json({ message: 'Authentication failed', error: error.message });
  }
};

module.exports = authenticateUser;