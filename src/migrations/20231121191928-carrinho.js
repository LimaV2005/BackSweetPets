'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up (queryInterface, Sequelize) {
   
     return queryInterface.createTable('carrinho', { 
       id: {
        allowNull: false,
        autoIncrement:true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
       id_produto: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      nome_usuario: {
        allowNull: false,
        type: Sequelize.STRING
      },
      nome: {
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
      quantidade:{
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
    return queryInterface.dropTable('carrinho');
     
  }
};