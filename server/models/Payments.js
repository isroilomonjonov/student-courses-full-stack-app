const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");
const Courses = require("./Courses");
const Students = require("./Students");
const Payment = sequelize.define(
  "Payment",
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    price: DataTypes.INTEGER,
  },
  {
    underscored: true,
  }
);
Students.hasMany(Payment);
Payment.belongsTo(Students);
Courses.hasMany(Payment);
Payment.belongsTo(Courses);
// Courses.belongsToMany(Students, { through: Payment });
module.exports = Payment;
