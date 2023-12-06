const listadesejosRepository = require('../repositories/listadesejosRepository')

module.exports = {
    async consultaLista(req,res){
        const {id_usuario} = req.body
        const row = await listadesejosRepository.consultaLista(id_usuario)
        res.json(row)
    },

    async addLista(req,res){
        const id_produto = req.body.id_produto
        const id_usuario = req.body.id_usuario
        const row = await listadesejosRepository.addLista(id_usuario, id_produto)
        res.json(row)
    },

    async removeLista(req, res){
        const id_produto = req.body.id_produto
        const id_usuario = req.body.id_usuario
        const row = await listadesejosRepository.removeLista(id_produto, id_usuario)
        res.json(row)
    }
}