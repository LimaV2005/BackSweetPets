const Produto = require("../models/produtos.js");
const Sequelize = require("sequelize")
const pedidofinal = require("../models/pedidofinal.js")

module.exports = {
  async allProduct() {
    try {
      const all = await Produto.findAll();
      return all;
    } catch (error) {
      console.error("Erro ao buscar todos os produtos:", error);
      throw error;
    }
  },

  async addProduct(nome_produto, descricao, preco, categoria) {
    try {
      const produto = await Produto.findOne({ where: { nome_produto } });
  
      if (produto) {
        return "Produto já cadastrado, tente outro nome";
      } else {
        const newProduto = await Produto.create({
          nome_produto,
          descricao,
          preco,
          categoria,
        });
        return newProduto;
      }
    } catch (error) {
      console.error("Erro ao adicionar o produto:", error);
      return error.message;
    }
  },

  async buyProduct(id) {
    try {
      const prod = await Produto.findOne({ where: { id } });
  
      if (!prod) {
        return "Compra NÃO concluída, tente novamente";
      } else {
        // Aqui falta a definição de idpedido e id_usuario, será necessário fornecer esses valores
        // Além disso, é necessário definir como você está gerenciando esses valores ou criar esses valores antes de utilizar
        const abrirPedido = await PedidoFinal.create({
          id_pedido: idpedido, // Defina o valor de idpedido
          id_usuario: id_usuario, // Defina o valor de id_usuario
          valor_pedido: valor_total, // Defina o valor de valor_total
          estado: '1',
        });
  
        return `Compra realizada com sucesso, aproveite sua(seu) ${prod.nome_produto}`;
      }
    } catch (error) {
      console.error("Erro ao comprar o produto:", error);
      return error.message;
    }
  },

  async updateProduct(id, nome_produto, descricao, preco, categoria) {
    try {
      const oneProduct = await Produto.findByPk(id);
  
      if (!oneProduct) {
        return "Não achou produto";
      } else {
        await Produto.update(
          { nome_produto, descricao, preco, categoria },
          { where: { id } }
        );
        const newProduto = await Produto.findByPk(id);
        return newProduto;
      }
    } catch (error) {
      console.error("Erro ao atualizar o produto:", error);
      return error.message;
    }
  },

  async deletarProduto(id){
    try {
      const produto = await Produto.findOne({ where: { id } });
  
      if (!produto) {
        return "Produto não encontrado, verifique o id";
      } else {
        await Produto.destroy({ where: { id } });
        return "Produto excluído";
      }
    } catch (error) {
      console.error("Erro ao excluir o produto:", error);
      return error.message;
    }
  }

  
};
