// const { Model, DataTypes } = require("sequelize");

// class pedidos extends Model {
//   static init(sequelize) {
//     super.init(
//       {
//         id_pedido: DataTypes.INTEGER,
//         id_usuario: DataTypes.INTEGER,
//         id_produto: DataTypes.INTEGER,
//         preco_unidade: DataTypes.FLOAT,
//         quantidade: DataTypes.INTEGER,
//         valor_pedido: DataTypes.DECIMAL(10, 2),
//         createdAt: DataTypes.DATE,
//         updatedAt: DataTypes.DATE,
//       },
//       {
//         sequelize,
//         modelName: "pedidos",
//         tableName: "pedidos",
//       }
//     );
//   }
// }

// module.exports = pedidos;


const { Sequelize, DataTypes } = require("sequelize");

const {sequelize} = require("../config/database.js");


const pedidos = sequelize.define(
  "pedidos",
  {
    id_pedido: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_produto: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    preco_unidade: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    valor_pedido: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
    }
  },
  {
    timestamps: true,
  }
);
module.exports = pedidos;