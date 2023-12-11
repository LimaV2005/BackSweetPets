const pedidos = require('../models/pedido')
const pedidosRepository = require('../repositories/pedidosRepository')

module.exports = { 
    async fecharPedido(req, res){
        try {
          const { id_usuario } = req.body;
      
          const row = await pedidosRepository.fecharPedido(id_usuario);
      
          if (row && !row.includes("Cliente não encontrado. Verifique o ID fornecido.") && !row.includes("O carrinho está vazio. Não é possível criar o pedido.")) {
            res.status(200).json({ message: row });
          } else {
            res.status(400).json({ error: row });
          }
        } catch (error) {
          res.status(500).json({ error: "Erro ao fechar o pedido" });
        }
      },
      

      async consultarPedido(req, res){
        try {
          const { id_pedido } = req.body;
      
          const row = await pedidosRepository.consultarPedido(id_pedido);
      
          if (row && !row.includes("Oops, pedido não encontrado! :/")) {
            res.status(200).json(row);
          } else {
            res.status(404).json({ error: row });
          }
        } catch (error) {
          res.status(500).json({ error: "Erro ao consultar o pedido" });
        }
      },
    
      async avaliarProduto(req, res){
        try {
          const { id_usuario, id_produto, nota } = req.body;
      
          const row = await pedidosRepository.avaliarProduto(id_usuario, id_produto, nota);
      
          if (row && !row.includes("deu algo errado")) {
            res.status(200).json({ message: row });
          } else {
            res.status(400).json({ error: row });
          }
        } catch (error) {
          res.status(500).json({ error: "Erro ao avaliar o produto" });
        }
      },

      async maisVendido(req, res){
        try {
          const row = await pedidosRepository.maisVendido();
      
          if (row && !row.includes("Ocorreu um erro:")) {
            res.status(200).json(row);
          } else {
            res.status(400).json({ error: row });
          }
        } catch (error) {
          res.status(500).json({ error: "Erro ao buscar os produtos mais vendidos" });
        }
      },

      async totalVendido(req, res){
        try {
          const row = await pedidosRepository.totalVendido();
      
          if (row !== undefined && row !== null && row !== "Ocorreu um erro ao calcular o total vendido:") {
            res.status(200).json({ total_vendido: row });
          } else {
            res.status(400).json({ error: "Ocorreu um erro ao calcular o total vendido" });
          }
        } catch (error) {
          res.status(500).json({ error: "Erro ao calcular o total vendido" });
        }
      },






}