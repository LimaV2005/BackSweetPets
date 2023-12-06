const Carrinho = require("../models/carrinho");
const Produto = require("../models/produtos");
const User = require('../models/User.js')
//ATENÇÃO, REFAZER
module.exports = {
  async consultaCarrinho(id_usuario) {
    try {
      const row = await Carrinho.findAll({where: { id_usuario } });
      if (row && row.length > 0) {
        return row;
      } else {
        return "Nenhum item no carrinho encontrado.";
      }
    } catch (error) {
      throw new Error("Erro ao consultar carrinho: " + error.message);
    }
  },

  async addCarrinho(id_produto, id_usuario , quantidade) {
    try {
      const produto = await Produto.findOne({ where: { id: id_produto } });
      console.log(id_usuario)
      const { descricao, preco, categoria } = produto;
      if (produto) {
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
        // throw new Error("Produto não encontrado para adicionar ao carrinho, ou usuario invalido")
        return "Produto não encontrado para adicionar ao carrinho, ou usuario invalido. Tente novamente em instantes."
        
      }
    } catch (error) {
      throw new Error("Erro ao adicionar no carrinho: " + error.message);
    }
  },

  async removeCarrinho(id_produto, id_usuario) {
    try {
    const produto = await Carrinho.findOne({ where: { id_produto: id_produto, id_usuario: id_usuario} });
    if (produto) {
      const nome = produto.nome_produto;
      await Carrinho.destroy({ where: { id_produto: id_produto, id_usuario: id_usuario}  });
      return "Produto removido com sucesso: " + nome;
    } else {
      throw new Error("Produto não encontrado para remover da lista");
    }
  } catch (error) {
    throw new Error("Erro ao remover do carrinho: " + error.message);
  }
  },

  async deletarCarrinho() {
    const row = await Carrinho.destroy({
      where: {},
      truncate: true,
    });
    return 'Todos os registros foram apagados do carrinho'
  },
};