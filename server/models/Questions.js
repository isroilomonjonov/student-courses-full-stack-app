const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");
const Answers = require("./Answers");
const Questions = sequelize.define(
  "questions",
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    question:{
        type: DataTypes.TEXT
    }
  },
  {
    underscored: true,
  }
);
Questions.hasMany(Answers);

Answers.belongsTo(Questions);
module.exports = Questions;
