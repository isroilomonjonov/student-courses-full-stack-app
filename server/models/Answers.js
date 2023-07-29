const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");
const Answers = sequelize.define(
  "answers",
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    text:{
        type: DataTypes.STRING
    },
    isTrue:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
  },
  {
    underscored: true,
  }
);
module.exports = Answers;
