const { Users, Bookings, Tours } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  // Update the user profile
  updateUser: async (req, res) => {
    const userID = req.params.id;

    try {
      const user = await Users.findByPk(userID);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      user.firstname = req.body.firstname;
      user.lastname = req.body.lastname;
      user.DOB = req.body.dob;
      user.address = req.body.address;
      user.city = req.body.city;
      user.province = req.body.province;
      user.zip = req.body.zip;
      user.phone = req.body.phone;

      await user.save();
      res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Get the user
  getUser: async (req, res) => {
    const userID = req.params.id;
    try {
      const userInfo = await Users.findByPk(userID);
      if (!userInfo) {
        return res.status(404).json({ error: "User not found" });
      }
      console.log("fecthed UserInfo from DB: ", userInfo);
      res.status(200).json(userInfo);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Change user password
  changePassword: async (req, res) => {
    const { id, newPassword } = req.body;

    try {
      const userFound = await Users.findByPk(id);

      if (!userFound) {
        return res.status(404).json({ error: "User not found" });
      }

      // Compare the provided password with the stored hashed password
      const passwordMatch = await bcrypt.compare(
        newPassword,
        userFound.password
      );

      if (passwordMatch) {
        // Filtering attempts to update with the same password as before
        return res.status(403).json({
          message: "Updating the password to the same as before is not allowed",
        });
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

      // Update the user's password in the database
      userFound.password = hashedNewPassword;
      await userFound.save();

      res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  // User can delete themselves from database
  deleteUser: async (req, res) => {
    try {
      const userID = req.params.id;
      const user = await Users.findByPk(userID);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Delete the user in the database
      await Users.destroy({ where: { userID: userID } });

      // Delete the access token cookie
      res.clearCookie("access-token");

      res.status(200).json({ message: "Account deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  // User can view their bookings
  getBookings: async (req, res) => {
    const userID = req.params.id;

    try {
      const user = await Users.findByPk(userID);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const bookings = await Bookings.findAll({
        where: { userID: userID },
        include: [
          {
            model: Tours,
            as: "bookingTour",
          },
        ],
      });

      res.status(200).json(bookings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
