const { Sequelize, DataTypes } = require("sequelize");

const {sequelize} = require("../config/database.js");


const classificacao = sequelize.define(
  "classificacao",
  {
    
    id_usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    id_produto: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nota: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
    },
   
  },
   {    
        timestamps: false,
        freezeTableName: true, // Evita a pluralização automática do nome da tabela
      }
);
module.exports = classificacao;