module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      userID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      firstname: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      lastname: {
        type: DataTypes.STRING(40),
        allowNull: true,
      },
      DOB: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING(40),
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      province: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      zip: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      roles: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
    },
    { freezeTableName: true }
  );
  return Users;
};
