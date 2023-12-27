const produtoRepository = require("../repositories/produtoRepository");


module.exports = {
  async allProducts(req, res){
    try {
      const row = await produtoRepository.allProduct();
      
      if (row && row.length > 0) {
        res.status(200).json(row);
      } else {
        res.status(404).json({ error: "Nenhum produto encontrado" });
      }
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar todos os produtos" });
    }
  },

  async addProduto(req, res){
    try {
      const { nome, descricao, preco, categoria} = req.body;
      const row = await produtoRepository.addProduct(nome, descricao, preco, categoria);
      
      if (row && row !== "Produto já cadastrado, tente outro nome") {
        res.status(201).json(row);
      } else {
        res.status(400).json({ error: row });
      }
    } catch (error) {
      res.status(500).json(error);
      console.log(error)
    }
  },

  async buyProduct(req, res){
    try {
      const { id } = req.body;
      const row = await produtoRepository.buyProduct(id);
  
      if (row && row !== "Compra NÃO concluída, tente novamente") {
        res.status(200).json({ message: row });
      } else {
        res.status(400).json({ error: row });
      }
    } catch (error) {
      res.status(500).json({ error: "Erro ao comprar o produto" });
    }
  },

  async updateProduct(req, res){
    try {
      const { id, nome_produto, descricao, preco, categoria } = req.body;
      const row = await produtoRepository.updateProduct(id, nome_produto, descricao, preco, categoria);
  
      if (row && row !== "Não achou produto") {
        res.status(200).json(row);
      } else {
        res.status(404).json({ error: "Produto não encontrado" });
      }
    } catch (error) {
      res.status(500).json({ error: "Erro ao atualizar o produto" });
    }
  },

  async deletarProduto(req, res){
    try {
      const { id } = req.body;
      const row = await produtoRepository.deletarProduto(id);
  
      if (row && row !== "Produto não encontrado, verifique o id") {
        res.status(200).json({ message: row });
      } else {
        res.status(404).json({ error: "Produto não encontrado" });
      }
    } catch (error) {
      res.status(500).json({ error: "Erro ao excluir o produto" });
    }
  },

  async filtrarCategoria(req,res){
    try {
      const { categoria } = req.body;
      const row = await produtoRepository.filtrarCategoria(categoria);
  
      if (row && row !== "Produtos não encontrado, verifique a categoria") {
        res.status(200).json({ message: row });
      } else {
        res.status(404).json({ error: "Produtos não encontrados" });
      }
    } catch (error) {
      res.status(500).json({ error: "Erro ao filtrar os produto" });
    }
  }
}