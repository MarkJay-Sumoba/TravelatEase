module.exports = (sequelize, DataTypes) => {
  const Tours = sequelize.define(
    "Tours",
    {
      tourID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      availability: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      region: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      tourDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { freezeTableName: true }
  );

  return Tours;
};
