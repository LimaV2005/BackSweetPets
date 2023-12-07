const carrinhoRepository = require('../repositories/carrinhoRepository')

module.exports = {
    async consultaCarrinho(req,res){
        const {id_usuario} = req.body
        const row = await carrinhoRepository.consultaCarrinho(id_usuario)
        res.json(row)
    },

    async addCarrinho(req,res){
        const id_produto = req.body.id_produto
        const id_usuario = req.body.id_usuario
        const {quantidade} = req.body
        const row = await carrinhoRepository.addCarrinho(id_produto, id_usuario, quantidade)
        res.json(row)

    },

    async atualizarCarrinho(req,res){
        const id_produto = req.body.id_produto
        const id_usuario = req.body.id_usuario
        const {quantidade} = req.body
        const row = await carrinhoRepository.atualizaCarrinho(id_produto, id_usuario, quantidade)
        res.json(row)
    },

    async removeCarrinho(req, res){
        const id_usuario = req.body.id_usuario
        const id_produto = req.body.id_produto
        
        const row = await carrinhoRepository.removeCarrinho(id_produto, id_usuario)
        res.json(row)
    },

    async excluirSeuCarrinho(req,res){
        const id_usuario = req.body.id_usuario
        const row = await carrinhoRepository.excluirSeuCarrinho(id_usuario)
        res.json(row)
    },

    async deletarCarrinho(req,res){
        const row = await carrinhoRepository.deletarCarrinho()
        res.json(row)
    }

}