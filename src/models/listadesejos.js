const { Sequelize, DataTypes } = require("sequelize");
const { sequelize} = require("../config/database");

const lista = sequelize.define(
  "listadesejos",
  {
    id_produto: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    preco: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoria: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = lista;
