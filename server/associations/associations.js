const {
  Users,
  Bookings,
  ContactUs,
  Payment,
  Reviews,
  Tours,
} = require("../models");

function setupAssociations() {
  // Define foreign key relationships
  Users.hasMany(Bookings, { foreignKey: "userID", onDelete: "CASCADE" });
  Bookings.belongsTo(Users, {
    foreignKey: "userID",
    as: "bookingUser",
    onDelete: "CASCADE",
  });

  Users.hasMany(ContactUs, { foreignKey: "userID", onDelete: "CASCADE" });
  ContactUs.belongsTo(Users, { foreignKey: "userID", onDelete: "CASCADE" });

  Users.hasMany(Reviews, {
    foreignKey: "userID",
    as: "userReviews",
    onDelete: "CASCADE",
  });
  Reviews.belongsTo(Users, {
    foreignKey: "userID",
    as: "reviewUser",
    onDelete: "CASCADE",
  });

  Bookings.hasOne(Payment, { foreignKey: "bookingID", onDelete: "CASCADE" });
  Payment.belongsTo(Bookings, { foreignKey: "bookingID", onDelete: "CASCADE" });

  Tours.hasMany(Bookings, { foreignKey: "tourID", onDelete: "CASCADE" });
  Bookings.belongsTo(Tours, {
    foreignKey: "tourID",
    as: "bookingTour",
    onDelete: "CASCADE",
  });

  Tours.hasMany(Reviews, {
    foreignKey: "tourID",
    as: "tourReviews",
    onDelete: "CASCADE",
  });
  Reviews.belongsTo(Tours, {
    foreignKey: "tourID",
    as: "reviewTour",
    onDelete: "CASCADE",
  });
}

module.exports = setupAssociations;
