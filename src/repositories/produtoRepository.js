const Produto = require("../models/produtos.js");
const Sequelize = require("sequelize")
const pedidofinal = require("../models/pedidofinal.js")

module.exports = {
  async allProduct() {
    const all = await Produto.findAll();
    return all
  },

  async addProduct(nome_produto, descricao, preco, categoria) {
    try {
      const produto = await Produto.findOne({ where: { nome_produto } });

      if (produto) {
        return ("Produto já cadastrado, tente outro nome");
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
      throw new Error(error.message);
    }
  },

  async buyProduct(id) {
    try {
      const abrirPedido = await PedidoFinal.create({
        id_pedido: idpedido,
        id_usuario: id_usuario,
        valor_pedido: valor_total,
        estado:'1',
    })
      const prod = await Produto.findOne({ where: { id } });
      
      if (!prod) {
            return ("Compra NÃO concluída, tente novamente");
          } else {
            return (
              `Compra realizada com sucesso, aproveite sua(seu) ` + prod.nome_produto
            );
          }
    } catch (error) {
      return error
    }
    
  },

  async updateProduct(id, nome_produto, descricao, preco, categoria) {
    try {
      const oneProduct = await Produto.findByPk(id);
        if (!oneProduct) {
          return ("Não achou produto");
        } else {
          const produto = Produto.update(
            { nome_produto, descricao, preco, categoria },
            { where: { id } }
          );
          const newProduto = await Produto.findByPk(id);
          return (newProduto);
        }
    } catch (error) {
      return error
    }
    
  },

  async deletarProduto(id){
    try {
      const user = await Produto.findOne({ where: { id } });
      if (!user) {
        return ("Produto não encontrado, verifique o id");
      } else {
        await Produto.destroy({ where: { id } });
        return ("produto excluido");
      }
    } catch (error) {
      return error
    }
  }

  
};
