const { Reviews, Tours, Users } = require("../models");

module.exports = {
  // Make a review
  createReview: async (req, res) => {
    try {
      const reviewData = req.body;
      const reviewCreated = await Reviews.create(reviewData);

      console.log("Create Review successful", reviewCreated);

      const tour = await Tours.findByPk(reviewData.tourID, {
        include: [
          {
            model: Reviews,
            as: "tourReviews",
            include: [
              {
                model: Users,
                as: "reviewUser",
              },
            ],
          },
        ],
      });

      // Send both review and tour in the response
      res.json({ review: reviewCreated, tour });
    } catch (error) {
      console.error("Error during review creation", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};
