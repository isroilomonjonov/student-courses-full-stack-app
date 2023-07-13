const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");
const Courses = require("./Courses");
const Students = require("./Students");
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
Students.hasMany(Enrollment);
Enrollment.belongsTo(Students);
Courses.hasMany(Enrollment);
Enrollment.belongsTo(Courses);
module.exports = Enrollment;
// Students.belongsToMany(Courses, { through: Enrollment });
// Courses.belongsToMany(Students, { through: Enrollment });
