'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up (queryInterface, Sequelize) {
   
     return queryInterface.createTable('relatorio', { 
       id_pedido: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      cliente: {
        allowNull: false,
        type: Sequelize.STRING
      },
      nome_produto: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      ticket_medio:{
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
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
    return queryInterface.dropTable('relatorio');
     
  }
};
