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



// const { Model, DataTypes } = require("sequelize");

// class PedidoFinal extends Model {
//   static init(sequelize) {
//     super.init(
//       {
//         id_pedido: DataTypes.INTEGER,
//         id_usuario: DataTypes.INTEGER,
//         valor_pedido: DataTypes.DECIMAL(10, 2),
//         estado: DataTypes.INTEGER,
//         createdAt: DataTypes.DATE,
//         updatedAt: DataTypes.DATE,
//       },
//       {
//         sequelize,
//         modelName: "pedidofinal",
//         tableName: "pedidosfinal",
//       }
//     );
//   }
// }

// module.exports = PedidoFinal;