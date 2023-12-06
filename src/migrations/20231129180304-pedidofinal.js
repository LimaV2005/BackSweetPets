'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up (queryInterface, Sequelize) {
   
     return queryInterface.createTable('pedidosfinal', { 
       id_pedido: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER
      },
      id_usuario: {
        allowNull: false,
        type: Sequelize.STRING
      },
      id_produto: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      valor_pedido:{
        allowNull: false,
        type: Sequelize.DECIMAL(10,2)
      },
      status:{
        allowNull: false,
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  
     
  },

   down (queryInterface, Sequelize) {
    return queryInterface.dropTable('pedidosfinal');
     
  }
};