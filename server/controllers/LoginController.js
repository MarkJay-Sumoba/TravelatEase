const { Users } = require("../models/");

const { createTokens } = require("../Middleware/JWT");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const dotenv = require("dotenv");
dotenv.config();
const jwtSecretKey = process.env.JWT_SECRET_KEY;

module.exports = {
  // User login
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const userLogin = await Users.findOne({ where: { email } });

      if (!userLogin) {
        return res.status(401).json({ message: "User does not exist" });
      }

      // Compare the provided password with the stored hashed password
      const passwordMatch = await bcrypt.compare(password, userLogin.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: "Incorrect password" });
      }

      // Passwords match, create an access token
      const accessToken = createTokens({
        id: userLogin.userID,
        email: userLogin.email,
      });

      // Create cookie
      res.cookie("access-token", accessToken, {
        maxAge: 60 * 60 * 24,
        secure: true,
        sameSite: "lax",
      });

      res.status(200).json({
        message: "Login successful",
        user: {
          id: userLogin.userID,
          email: userLogin.email,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  // Get the current logged in user
  getLoggedInUser: async (req, res) => {
    try {
      const token = req.cookies["access-token"];
      if (!token) {
        return res.status(401).json({ message: "User not authenticated" });
      }

      // Verify the token to get user information
      const decodedToken = jwt.verify(token, jwtSecretKey);

      const user = await Users.findByPk(decodedToken.id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Return user data excluding sensitive information like password
      res.status(200).json({
        status: "Success",
        user: {
          id: user.userID,
          email: user.email,
          role: user.roles,
          firstname: user.firstname,
          lastname: user.lastname,
          DOB: user.DOB,
          address: user.address,
          city: user.city,
          province: user.province,
          zip: user.zip,
          phone: user.phone,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};
