const Produto = require("../models/produtos");
const User = require("../models/User");
const carrinho = require("../models/carrinho");
const pedidosItem = require("../models/pedido");
const PedidoFinal = require("../models/pedidofinal");
const classificacao = require("../models/classificacao");
const Sequelize = require("sequelize");

module.exports = {
  async fecharPedido(id_usuario) {
    try {
      const cliente = await User.findOne({ where: { id: id_usuario } });

      if (!cliente) {
        return "Cliente não encontrado. Verifique o ID fornecido.";
      }
      const produto = await Produto.findAll();
      const pedido = await carrinho.findAll({ where: { id_usuario } });
      const idpedido = produto[0].id + (Math.floor(Math.random() * 100) + 1);

      if (pedido.length > 0) {
        for (const item of pedido) {
          const novoPedido = await pedidosItem.create({
            id_pedido: idpedido,
            id_usuario: cliente.id,
            id_produto: item.id_produto,
            preco_unidade: item.preco,
            quantidade: item.quantidade,
            valor_pedido: item.quantidade * item.preco,
          });
        }
        const valor_total = await pedidosItem.sum("valor_pedido", {
          where: { id_pedido: idpedido },
        });
        const abrirPedido = await PedidoFinal.create({
          id_pedido: idpedido,
          id_usuario: id_usuario,
          valor_pedido: valor_total,
          estado: "1",
        });

        console.log("Pedido realizado");
        return `Pedido realizado com sucesso! Prossiga para realizar o pagamento, o id do seu pedido é  ${idpedido}`;
      } else {
        return "O carrinho está vazio. Não é possível criar o pedido.";
      }
    } catch (error) {
      console.error("Erro ao fechar o pedido:", error);
      throw new Error("Ocorreu um erro ao fechar o pedido.");
    }
  },
  async consultarPedido(id_pedido) {
    try {
      const row = await pedidosItem.findAll({
        where: { id_pedido },
        attributes: ["id_pedido", "quantidade", "valor_pedido"],
      });

      if (row.length > 0) {
        return row;
      } else {
        return "Oops, pedido não encontrado! :/";
      }
    } catch (error) {}
  },
  async avaliarProduto(id_usuario, id_produto, nota) {
    const acharUsuario = await User.findOne({ where: { id: id_usuario } });
    const acharProduto = await Produto.findOne({ where: { id: id_produto } });

    if (acharUsuario && acharProduto) {
      try {
        const novaNota = await classificacao.create({
          id_usuario,
          id_produto,
          nota,
        });
        return `O usuário ${acharUsuario.nome} avaliou o produto ${acharProduto.nome_produto} com a nota ${nota}`;
      } catch (error) {
        return "deu algo errado" + error;
      }
    }
  },

  async maisVendido() {
    try {
      const apareceMais = await pedidosItem.findAll({
        attributes: [
          "id_produto",
          [Sequelize.fn("COUNT", Sequelize.col("id_produto")), "aparicoes"],
        ],
        group: ["id_produto"],
        order: Sequelize.literal("COUNT(id_produto) DESC"),
      });

      const produtosMaisVendidos = [];
      for (const produto of apareceMais) {
        const idProduto = produto.id_produto;
        const aparicoes = produto.dataValues.aparicoes;

        const prod = await Produto.findOne({ where: { id: idProduto } });
        produtosMaisVendidos.push({ produto: prod, aparicoes: aparicoes });
      }

      return produtosMaisVendidos;
    } catch (error) {
      return "Ocorreu um erro:", error;
    }
  },

  async totalVendido() {
    try {
      const resultado = await pedidosItem.findOne({
        attributes: [
          [Sequelize.fn("SUM", Sequelize.col("valor_pedido")), "total_vendido"],
        ],
      });

      return resultado.dataValues.total_vendido || 0;
    } catch (error) {
      console.error("Ocorreu um erro ao calcular o total vendido:", error);
      return error;
    }
  },
};


