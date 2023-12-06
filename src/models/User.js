// const { Model, DataTypes } = require('sequelize')

// class User extends Model {
//     static init(sequelize) {
//         super.init({
//             nome: DataTypes.STRING,
//             email: DataTypes.STRING,
//             senha: DataTypes.STRING,
//             cargo: DataTypes.STRING,
//             createdAt: DataTypes.DATE,
//             updatedAt: DataTypes.DATE
//         }, {
//             sequelize
//         })
//     }}

//     module.exports = User

const { Sequelize, DataTypes } = require("sequelize");
const { sequelize} = require("../config/database");

const User = sequelize.define(
  "users",
  {
    nome: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cargo: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
  {
    timestamps: true,
  }
);
module.exports = User;