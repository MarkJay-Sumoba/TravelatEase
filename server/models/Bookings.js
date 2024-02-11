module.exports = (sequelize, DataTypes) => {
  const Bookings = sequelize.define(
    "Bookings",
    {
      bookingID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      tourID: {
        type: DataTypes.INTEGER,
      },
      providedFullName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      providedEmail: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      providedPhone: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      guests: {
        type: DataTypes.INTEGER,
      },
      totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
      },
      userID: {
        type: DataTypes.INTEGER,
      },
      withdraw: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    { freezeTableName: true }
  );

  return Bookings;
};
