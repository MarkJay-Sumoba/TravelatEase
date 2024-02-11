const { Bookings, Tours, Users } = require("../models");

module.exports = {
  // Make a booking
  makeBooking: async (req, res) => {
    try {
      const {
        tourID,
        providedFullName,
        providedEmail,
        providedPhone,
        guests,
        totalPrice,
        userID,
        withdraw,
      } = req.body;

      const requiredFields = [
        "tourID",
        "providedFullName",
        "providedEmail",
        "providedPhone",
        "guests",
        "totalPrice",
        "userID",
        "withdraw",
      ];

      if (requiredFields.some((field) => !req.body[field])) {
        console.error(
          "Incomplete data provided for booking. Missing fields:",
          requiredFields.filter((field) => !req.body[field])
        );
        return res.status(400).json({
          error: "Incomplete data provided for booking",
          missingFields: requiredFields.filter((field) => !req.body[field]),
        });
      }

      const tour = await Tours.findOne({ where: { tourID } });
      const user = await Users.findOne({ where: { userID } });

      // If user is not found
      if (!tour || !user) {
        return res.status(404).json({ error: "Tour or user not found" });
      }

      // Create booking in database
      const createBooking = await Bookings.create({
        tourID,
        providedFullName,
        providedEmail,
        providedPhone,
        guests,
        totalPrice,
        userID,
        withdraw,
      });

      return res.status(201).json(createBooking);
    } catch (error) {
      console.error("Error creating booking:", error);

      if (error.name === "SequelizeValidationError") {
        return res
          .status(400)
          .json({ error: "Validation error", details: error.errors });
      }

      return res.status(500).json({ error: "Internal server error" });
    }
  },
  // Delete the last tour booked by a user is payment was not made
  deleteBookingByUserId: async (req, res) => {
    const userID = +req.params.userID;
    console.log("Received userID:", req.params.userID);

    try {
      if (!userID) {
        return res
          .status(400)
          .json({ error: "A user must be logged in to delete a booking" });
      }

      const latestBooking = await Bookings.findOne({
        where: { userID },
        order: [["createdAt", "DESC"]],
      });

      if (!latestBooking) {
        return res.status(404).json({ error: "No booking found" });
      }

      await latestBooking.destroy();

      return res.status(204).send();
    } catch (error) {
      console.error("Error deleting booking:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
};
