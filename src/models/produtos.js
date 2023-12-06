// const { Model, DataTypes } = require("sequelize");

// class Product extends Model {
//   static init(sequelize) {
//     return super.init(
//       {
//         nome_produto: DataTypes.STRING,
//         descricao: DataTypes.TEXT,
//         preco: DataTypes.DECIMAL,
//         categoria: DataTypes.STRING,
//       },
//       {
//         sequelize,
//         modelName: "produtos",
//         tableName: "produtos",
//       }
//     );
//   }
// }

// module.exports = Product;
const { Sequelize, DataTypes } = require("sequelize");

const {sequelize} = require("../config/database.js");

const Product = sequelize.define(
  "produtos",
  {
    nome_produto: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    preco: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    categoria: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    timestamps: true,
  }
);
module.exports = Product;
