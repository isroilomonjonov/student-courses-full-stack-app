const { DataTypes} = require("sequelize");
const sequelize = require("../utils/db");
const Students=require("./Students")
const Courses = sequelize.define(
  "courses",
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
    status:{type:DataTypes.BOOLEAN,
      defaultValue:true
    }
  },
  {
    underscored: true,
  }
);
Courses.hasMany(Students)
Students.belongsTo(Courses)
module.exports = Courses;