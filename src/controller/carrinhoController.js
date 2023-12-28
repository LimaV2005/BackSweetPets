const carrinhoRepository = require('../repositories/carrinhoRepository')

module.exports = {
  async consultaCarrinho(req, res){
    try {
      console.log('oi')
      const { id_usuario } = req.body;
      const row = await carrinhoRepository.consultaCarrinho(id_usuario);
            
      if (!row) {
        return res.status(404).json({ error: "Nenhum item no carrinho encontrado." });
      }
        
      res.status(200).json(row);
    } catch (error) {
      console.log(error); // Registrar o erro para depuração
      res.status(500).json({ error: "Erro ao consultar o carrinho" });
    }
  },
  

      async addCarrinho(req, res){
        try {
          const id_produto = req.body.id_produto;
          const id_usuario = req.body.id_usuario;
          const { quantidade } = req.body;
      
          const row = await carrinhoRepository.addCarrinho(id_produto, id_usuario, quantidade);
      
          if (row && row !== "Produto não encontrado para adicionar ao carrinho, ou usuario invalido. Tente novamente em instantes.") {
            res.status(201).json(row);
          } else {
            res.status(404).json({ error: "Produto não encontrado para adicionar ao carrinho, ou usuário inválido. Tente novamente em instantes." });
          }
        } catch (error) {
          res.status(500).json({ error: "Erro ao adicionar no carrinho" });
        }
    },

    async atualizarCarrinho(req,res){
        try {
          const id_produto = req.body.id_produto;
          const id_usuario = req.body.id_usuario;
          const { quantidade } = req.body;
      
          const row = await carrinhoRepository.atualizaCarrinho(id_produto, id_usuario, quantidade);
      
          if (row === "Quantidade atualizada") {
            res.status(200).json({ message: "Quantidade atualizada" });
          } else if (row === "Produto encontrado, mas não no carrinho deste usuário." || row === "Produto não encontrado.") {
            res.status(404).json({ error: row });
          } else {
            res.status(500).json({ error: "Erro ao atualizar o carrinho" });
          }
        } catch (error) {
          console.log(error)
          res.status(500).json({ error: "Erro ao atualizar o carrinho" });
        }
      },

    async removeCarrinho(req, res){
        try {
          const id_usuario = req.body.id_usuario;
          const id_produto = req.body.id_produto;
      
          const row = await carrinhoRepository.removeCarrinho(id_produto, id_usuario);
      
          if (row && !row.includes("Produto não encontrado para remover da lista")) {
            res.status(200).json({ message: row });
          } else {
            res.status(404).json({ error: "Produto não encontrado para remover da lista" });
          }
        } catch (error) {
          res.status(500).json({ error: "Erro ao remover do carrinho" });
        }
      },

      async excluirSeuCarrinho(req,res){
        try {
          const id_usuario = req.body.id_usuario;
          const row = await carrinhoRepository.excluirSeuCarrinho(id_usuario);
      
          if (row && !row.includes("Todos os registros foram apagados do carrinho de")) {
            res.status(404).json({ error: row });
          } else {
            res.status(200).json({ message: row });
          }
        } catch (error) {
          res.status(500).json({ error: "Erro ao excluir o carrinho do usuário" });
        }
      },

      async deletarCarrinho(req,res){
        try {
          const row = await carrinhoRepository.deletarCarrinho();
      
          if (row && row !== "Todos os registros foram apagados do carrinho") {
            res.status(500).json({ error: "Erro ao deletar o carrinho" });
          } else {
            res.status(200).json({ message: row });
          }
        } catch (error) {
          res.status(500).json({ error: "Erro ao deletar o carrinho" });
        }
      },

}