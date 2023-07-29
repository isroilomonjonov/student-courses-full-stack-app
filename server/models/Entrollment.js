const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");
const Courses = require("./Courses");
const Users = require("./User");
const Enrollment = sequelize.define(
  "Enrollment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    underscored: true,
  }
);
Users.hasMany(Enrollment);
Enrollment.belongsTo(Users);
Courses.hasMany(Enrollment);
Enrollment.belongsTo(Courses);
module.exports = Enrollment;