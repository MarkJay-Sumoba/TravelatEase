const { Users } = require("../models/");

// Create Token for Login
const { createTokens } = require("../JWT");
// Delete Token for User Deletion
const { deleteTokens } = require("../JWT");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  registerUser: async (req, res) => {
    try {
      const { password, ...otherFields } = req.body;
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      // Create a new object with the hashed password and other fields
      const userWithHashedPassword = {
        password: hashedPassword,
        ...otherFields,
      };
      // Create the user in the database
      const createUser = await Users.create(userWithHashedPassword);
      res.status(201).json(createUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      // Find the user by email
      const userLogin = await Users.findOne({ where: { email } });

      if (!userLogin) {
        // User not found
        return res.status(401).json({ message: "User does not exist" });
      }

      // Compare the provided password with the stored hashed password
      const passwordMatch = await bcrypt.compare(password, userLogin.password);

      if (!passwordMatch) {
        // Passwords do not match
        return res.status(401).json({ message: "Invalid password" });
      }

      // Passwords match, create an access token
      const accessToken = createTokens({
        id: userLogin.userID,
        email: userLogin.email,
      });

      res.cookie("access-token", accessToken, {
        maxAge: 60 * 60 * 24,
        httpOnly: true,
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

  getLoggedInUser: async (req, res) => {
    try {
      const token = req.cookies["access-token"];
      if (!token) {
        return res.status(401).json({ message: "User not authenticated" });
      }

      // Verify the token to get user information
      const decodedToken = jwt.verify(token, "jwtsecretplschange");

      // Find the user by ID
      const user = await Users.findByPk(decodedToken.id);

      if (!user) {
        // User not found
        return res.status(404).json({ message: "User not found" });
      }

      // Return user data excluding sensitive information like password
      res.status(200).json({
        status: "Success",
        user: {
          id: user.userID,
          email: user.email,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};
