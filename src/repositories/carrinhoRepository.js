const Carrinho = require("../models/carrinho");
const Produto = require("../models/produtos");
const User = require("../models/User.js");
//ATENÇÃO 
module.exports = {
  async consultaCarrinho(id_usuario) {
    try {
      const row = await Carrinho.findAll({ where: { id_usuario } });
      
      if (!row || (Array.isArray(row) && row.length === 0)) {
        return "Nenhum item no carrinho encontrado.";
      }
  
      return row;
    } catch (error) {
      throw error;
    }
  },

  async addCarrinho(id_produto, id_usuario, quantidade) {
    try {
      const produto = await Produto.findOne({ where: { id: id_produto } });
  
      if (produto) {
        const { descricao, preco, categoria } = produto;
  
        const adicionar = await Carrinho.create({
          id_produto,
          id_usuario: id_usuario,
          descricao,
          preco,
          quantidade,
          categoria,
        });
  
        return adicionar;
      } else {
        return "Produto não encontrado para adicionar ao carrinho, ou usuário inválido. Tente novamente em instantes.";
      }
    } catch (error) {
      throw error;
    }
  },

  async removeCarrinho(id_produto, id_usuario) {
    try {
      const produto = await Carrinho.findOne({
        where: { id_produto: id_produto, id_usuario: id_usuario },
      });
  
      if (produto) {
        const nome = produto.nome_produto;
        await Carrinho.destroy({
          where: { id_produto: id_produto, id_usuario: id_usuario },
        });
        return "Produto removido com sucesso: " + nome;
      } else {
        return "Produto não encontrado para remover da lista";
      }
    } catch (error) {
      throw error;
    }
  },

  async atualizaCarrinho(id_produto, id_usuario, quantidade) {
    try {
      const produto = await Produto.findOne({ where: { id: id_produto } });
  
      if (produto) {
        const prodCarrinho = await Carrinho.findOne({ where: { id_produto: id_produto, id_usuario: id_usuario } });
  
        if (prodCarrinho) {
          const { descricao, preco, categoria } = produto;
  
          await Carrinho.update(
            { id_usuario, descricao, preco, quantidade, categoria },
            { where: { id_produto: id_produto, id_usuario: id_usuario } }
          );
  
          return "Quantidade atualizada";
        } else {
          return "Produto encontrado, mas não no carrinho deste usuário.";
        }
      } else {
        return "Produto não encontrado.";
      }
    } catch (error) {
      throw error;
    }
  },

  async excluirSeuCarrinho(id_usuario) {
    try {
      const user = await User.findOne({ where: { id: id_usuario } });
      if (user) {
        const nome = user.nome;
        await Carrinho.destroy({ where: { id_usuario: id_usuario } });
        return "Todos os registros foram apagados do carrinho de " + nome;
      } else {
        return "Usuário não encontrado para excluir o carrinho";
      }
    } catch (error) {
      throw error;
    }
  },

  async deletarCarrinho() {
    try {
      const row = await Carrinho.destroy({
        where: {},
        truncate: true,
      });
  
      return "Todos os registros foram apagados do carrinho";
    } catch (error) {
      throw error;
    }
  },
};
