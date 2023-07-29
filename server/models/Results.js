const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");
const Results = sequelize.define(
  "results",
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    score:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    correctAnswers:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    wrongAnswers:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
  },
  {
    underscored: true,
  }
);

module.exports = Results;
