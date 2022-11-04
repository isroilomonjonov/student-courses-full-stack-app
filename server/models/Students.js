const { DataTypes} = require("sequelize");
const sequelize = require("../utils/db");
const Students = sequelize.define(
  "students",
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: DataTypes.STRING,
    birthDay: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isAfter: "1900-01-01",
        isBefore: "2020-01-01"
      },
    },
    course_id:{
     type: DataTypes.INTEGER,
     allowNull:true
    }
  },
  {
    underscored: true,
  }
);
module.exports = Students;
