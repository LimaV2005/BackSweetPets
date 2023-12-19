const { Sequelize, DataTypes } = require("sequelize");

const {sequelize} = require("../config/database.js");


const pedidofinal = sequelize.define(
  "pedidofinal",
  {
    id_pedido: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    valor_pedido: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
    },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    timestamps: true,
  }
);
module.exports = pedidofinal;
