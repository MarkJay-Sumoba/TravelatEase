module.exports = (sequelize, DataTypes) => {
  const Reviews = sequelize.define(
    "Reviews",
    {
      reviewID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      message: {
        type: DataTypes.STRING(800),
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      userID: {
        type: DataTypes.INTEGER,
      },
      tourID: {
        type: DataTypes.INTEGER,
      },
    },
    { freezeTableName: true }
  );

  return Reviews;
};
