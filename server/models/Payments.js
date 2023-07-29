const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");
const Courses = require("./Courses");
const Users = require("./User");
const Payment = sequelize.define(
  "Payment",
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    price: DataTypes.INTEGER,
    creatorId:DataTypes.UUID
  },
  {
    underscored: true,
  }
);
Courses.hasMany(Payment);
Payment.belongsTo(Courses);
module.exports = Payment;
