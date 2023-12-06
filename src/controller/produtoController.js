const produtoRepository = require("../repositories/produtoRepository");


module.exports = {
    async allProducts(req,res){
      const row = await produtoRepository.allProduct()
        res.json(row)
    },

    async addProduto(req, res){
    const nome_produto = req.body.nome;
    const descricao = req.body.descricao;
    const preco = req.body.preco;
    const categoria = req.body.categoria;
    const row = await produtoRepository.addProduct(nome_produto, descricao, preco, categoria);
    res.json(row);
  },

  async buyProduct(req,res){
    const {id} = req.body
    const row = await produtoRepository.buyProduct(id)
    res.json(row)
  }, 

  async updateProduct(req, res){
    const { id } = req.body
    const {nome_produto, descricao, preco, categoria} = req.body
    const row = await produtoRepository.updateProduct(id, nome_produto, descricao, preco, categoria)
    res.json(row)
  },

  async deletarProduto(req,res){
    const {id} = req.body
    const row = await produtoRepository.deletarProduto(id)
    res.json(row)
  }
}