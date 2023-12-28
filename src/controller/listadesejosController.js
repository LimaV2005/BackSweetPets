const listadesejosRepository = require('../repositories/listadesejosRepository')

module.exports = {
    async consultaLista(req, res){
        try {
          const { id_usuario } = req.body;
      
          const row = await listadesejosRepository.consultaLista(id_usuario);
      
          if (row && !row.includes("Nenhum item na lista de desejos encontrado.")) {
            res.status(200).json(row);
          } else {
            res.status(404).json({ error: row });
          }
        } catch (error) {
          res.status(500).json({ error: "Erro ao consultar a lista de desejos" });
        }
      },

      async addLista(req, res){
        try {
          const id_produto = req.body.id_produto;
          const id_usuario = req.body.id_usuario;
      
          const row = await listadesejosRepository.addLista(id_usuario, id_produto);
      
          if (row !== null) { // Verifica se row é diferente de null ou undefined
            res.status(201).json(row);
          } else {
            res.status(404).json({ error: "Produto não encontrado para adicionar à lista" });
          }
        } catch (error) {
          res.status(500).json({ error: "Erro ao adicionar o produto à lista de desejos" });
        }
      },
      
    async removeLista(req, res){
        try {
          const id_produto = req.body.id_produto;
          const id_usuario = req.body.id_usuario;
      
          const row = await listadesejosRepository.removeLista(id_produto, id_usuario);
      
          if (row && !row.includes("Produto não encontrado para remover da lista")) {
            res.status(200).json({ message: row });
          } else {
            res.status(404).json({ error: row });
          }
        } catch (error) {
          res.status(500).json({ error: "Erro ao remover o produto da lista de desejos" });
        }
      },
}