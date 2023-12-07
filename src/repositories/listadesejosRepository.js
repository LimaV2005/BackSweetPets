const Carrinho = require("../models/carrinho");
const Produto = require("../models/produtos");
const listadesejos = require("../models/listadesejos");
const User = require("../models/User");
const { where } = require("sequelize");
// ATENÇÃO REFAZER
module.exports = {
  async consultaLista(id_usuario) {
    try {
      const row = await listadesejos.findAll({ where: { id_usuario } });
      if (row && row.length > 0) {
        return row;
      } else {
        return "Nenhum item na lista de desejos encontrado.";
      }
    } catch (error) {
      throw new Error("Erro ao consultar lista: " + error.message);
    }
  },

  async addLista(id_usuario, id_produto) {
    try {
      const produto = await Produto.findOne({ where: { id: id_produto } });
      const { descricao, preco, categoria } = produto;
      const usuario = await User.findOne({ where: { id: id_usuario } });
      if (produto) {
        const adicionar = await listadesejos.create({
          id_produto,
          id_usuario,
          descricao,
          preco,
          categoria,
        });

        return adicionar;
      } else {
        return "Produto não encontrado para adicionar à lista";
      }
    } catch (error) {
      throw new Error("Erro ao adicionar na lista: " + error.message);
    }
  },

  async removeLista(id_produto, id_usuario) {
    try {
      const produto = await listadesejos.findOne({
        where: { id_produto: id_produto, id_usuario: id_usuario },
      });
      const nome_produto = await Produto.findOne({ where: { id: id_produto } });
      if (produto) {
        const nome = nome_produto.nome_produto;
        await listadesejos.destroy({
          where: { id_produto: id_produto, id_usuario: id_usuario },
        });
        return "Produto removido com sucesso: " + nome;
      } else {
        return "Produto não encontrado para remover da lista";
      }
    } catch (error) {
      throw new Error("Erro ao remover do carrinho: " + error.message);
    }
  },
};
