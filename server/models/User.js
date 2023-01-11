const { DataTypes} = require("sequelize");
const sequelize = require("../utils/db");
const Courses = require("./Courses");
const Users = sequelize.define(
  "users",
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [6],
            msg: "Parol kamida 6 ta belgidan iborat bo'lishi kerak",
          }
        }
    },
    phoneNumber:{
    type: DataTypes.STRING,
    allowNull: false
    },
    vericationCode: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    vericationCodeByPhone: {
      type: DataTypes.STRING,
      defaultValue:`${ Math.floor(1000 + Math.random() * 9000)}`
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    role: {
      type: DataTypes.ENUM(["SUPER_ADMIN","ADMIN"]),
      defaultValue:"ADMIN"
    }
  },
  {
    underscored: true,
  }
);
Users.hasMany(Courses)
Courses.belongsTo(Users)

module.exports = Users;
