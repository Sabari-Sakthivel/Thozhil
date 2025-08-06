const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET_KEY;

/**
 * Generates a JWT token with both `_id` and `id` fields for compatibility
 * with User and Company models.
 *
 * @param {string} _id - The MongoDB ObjectId of the user or company.
 * @param {string} role - The role of the user or company.
 * @returns {string} - JWT token valid for 30 days.
 */
const generateToken = (_id, role) => {
  return jwt.sign(
    {
      _id,
      id: _id,
      role,
    },
    JWT_SECRET,
    { expiresIn: "30d" }
  );
};

/**
 * Verifies a JWT token and returns the decoded payload.
 *
 * @param {string} token - The token to verify.
 * @returns {Object|null} - The decoded token payload or null if invalid.
 */
const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

module.exports = { generateToken, verifyToken };
