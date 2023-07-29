const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");
const Users = require("./User");
const Questions = require("./Questions");
const Courses = require("./Courses");
const Results = require("./Results");
const Tests = sequelize.define(
  "tests",
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
    },
    status: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  {
    underscored: true,
  }
);

Tests.hasMany(Questions);
Questions.belongsTo(Tests);
Tests.hasMany(Results);
Results.belongsTo(Tests);

module.exports = Tests;
