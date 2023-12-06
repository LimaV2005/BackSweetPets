// const { Model, DataTypes } = require("sequelize");

// class Carrinho extends Model {
//   static init(sequelize) {
//     super.init(
//       { 
//         id_produto: DataTypes.INTEGER,
//         id_usuario: DataTypes.INTEGER,
//         descricao: DataTypes.STRING,
//         preco: DataTypes.STRING,
//         quantidade: DataTypes.INTEGER,
//         categoria: DataTypes.STRING,
//         createdAt: DataTypes.DATE,
//         updatedAt: DataTypes.DATE,
//       },
//       {
//         sequelize,
//         modelName: "carrinho",
//         tableName: "carrinho",
//       }
//     );
//   }
// }

// module.exports = Carrinho;

const { Sequelize, DataTypes } = require("sequelize");
const { sequelize} = require("../config/database");

const Carrinho = sequelize.define(
  "carrinho",
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
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false
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
module.exports = Carrinho;
