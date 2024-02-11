const { Users } = require("../models/");

const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  // Register the user
  registerUser: async (req, res) => {
    try {
      const { email, password, ...otherFields } = req.body;

      // Validate user
      const validationError = await isUserValid(email, password);
      if (validationError) {
        return res.status(400).json({ message: validationError });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create a new object with the hashed password and other fields
      const userWithHashedPassword = {
        password: hashedPassword,
        email,
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
};

// Validation functions
const isEmailValid = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isPasswordValid = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d|\W)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
  return (
    passwordRegex.test(password) &&
    password.length >= 6 &&
    password.length <= 20
  );
};

const isUserValid = async (email, password) => {
  // Validate email
  if (!isEmailValid(email)) {
    return "Invalid email format";
  }

  // Validate password
  if (!isPasswordValid(password)) {
    return "Password must be at least 6 characters, at most 20 characters, and must contain at least one uppercase letter, one lowercase letter, and one number or special character";
  }

  // Check if the email already exists
  const existingUser = await Users.findOne({ where: { email } });
  if (existingUser) {
    return "Email already exists";
  }

  return null;
};
