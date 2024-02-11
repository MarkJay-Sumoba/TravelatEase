module.exports = (sequelize, DataTypes) => {
  const ContactUs = sequelize.define(
    "ContactUs",
    {
      contactusID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      message: {
        type: DataTypes.STRING(800),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(150),
      },
      name: {
        type: DataTypes.STRING(100),
      },
    },
    { freezeTableName: true }
  );
  return ContactUs;
};
