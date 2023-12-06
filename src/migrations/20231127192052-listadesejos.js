'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up (queryInterface, Sequelize) {
   
     return queryInterface.createTable('listadesejos', { 
      
       id_produto: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome_usuario: {
        type: Sequelize.STRING,
        allowNull: false
      },
      descricao: {
        type: Sequelize.STRING,
        allowNull: false
      },
      preco:{
        type: Sequelize.STRING,
        allowNull: false
      },
      categoria:{
        type: Sequelize.STRING,
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
    return queryInterface.dropTable('listadesejos');
     
  }
};