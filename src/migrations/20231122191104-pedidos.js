'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up (queryInterface, Sequelize) {
   
     return queryInterface.createTable('pedidos', { 
      id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER
      },
       id_pedido: {
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
      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },
      preco_unidade:{
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
      },
      quantidade:{
        type: Sequelize.STRING,
        allowNull: false
      },
      valor_pedido:{
        allowNull: false,
        type: Sequelize.DECIMAL(10,2)
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
    return queryInterface.dropTable('pedidos');
     
  }
};
