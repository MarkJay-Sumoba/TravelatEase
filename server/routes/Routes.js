const express = require("express");
const router = express.Router();
const controllerRegister = require("../controllers/RegisterController");
const controllerLogin = require("../controllers/LoginController");
const controllerTours = require("../controllers/TourController");
const profileController = require("../controllers/ProfileController");
const controllerBookings = require("../controllers/BookingController");
const controllerPayment = require("../controllers/PaymentController");
const ContactusController = require("../controllers/ContactusController");
const controllerReview = require("../controllers/ReviewController");

// Register Route
router.post("/register", controllerRegister.registerUser);

// Login Routes
const { validateToken } = require("../Middleware/JWT");
router.post("/login", controllerLogin.loginUser);
router.get("/logged-in-user", validateToken, controllerLogin.getLoggedInUser);

// Tours Routes
const { upload } = require("../Middleware/Multer");
router.post("/create-tour", upload.single("image"), controllerTours.createTour);
router.get("/tours", controllerTours.getTours);
router.get("/tours/:id", controllerTours.getTourById);
router.put(
  "/update-tour/:id",
  upload.single("image"),
  controllerTours.updateTour
);
router.delete("/delete-tour/:id", controllerTours.deleteTour);


// Profile Routes
// Update profile UserInfo
router.patch("/userUpdate/:id", profileController.updateUser);
// Retrieve User Info
router.get("/user/:id", profileController.getUser);
// Update Users password
router.patch("/change-password", profileController.changePassword);
// Delete User account
router.delete("/delete-user/:id", profileController.deleteUser);
// User views Bookings Routes
router.get("/get-bookings/:id", profileController.getBookings);

// Booking Routes
router.post("/make-booking", controllerBookings.makeBooking);
router.delete("/delete-booking/:userID", controllerBookings.deleteBookingByUserId);

// Stripe Payment Route
router.post("/make-payment", controllerPayment.makePayment);

// Create Review Route
router.post("/postReview", controllerReview.createReview);

// Contact Us Route
router.post("/contactus", ContactusController.createContactUs);

// Logout Route
router.post("/logout", (req, res) => {
  try {
    // Use clearCookie to remove the token cookie
    res.clearCookie("access-token");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
