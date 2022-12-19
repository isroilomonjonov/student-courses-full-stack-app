const { DataTypes} = require("sequelize");
const sequelize = require("../utils/db");
const Students=require("./Students")
const Courses = sequelize.define(
  "courses_full_stack",
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description:DataTypes.TEXT,
  },
  {
    underscored: true,
  }
);
module.exports = Courses;