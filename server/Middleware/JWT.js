const dotenv = require("dotenv");
dotenv.config();
const jwtSecretKey = process.env.JWT_SECRET_KEY;
const { sign, verify } = require("jsonwebtoken");

// Create Token
const createTokens = (user) => {
  const accessToken = sign({ email: user.email, id: user.id }, jwtSecretKey);

  return accessToken;
};

const validateToken = (req, res, next) => {
  const accessToken = req.cookies["access-token"];

  // If no access token is present, send an error response
  if (!accessToken)
    return res.status(400).json({ error: "User not Authenticated!" });

  try {
    // Verifying the access token
    const validToken = verify(accessToken, jwtSecretKey);

    // If the token is valid, setting 'req.authenticated' to true and proceeding to the next middleware
    if (validToken) {
      req.authenticated = true;
      return next();
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

module.exports = { createTokens, validateToken };
