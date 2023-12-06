const pedidos = require('../models/pedido')
const pedidosRepository = require('../repositories/pedidosRepository')

module.exports = { 
    async fecharPedido(req, res){
        const {id_usuario} = req.body
        const row = await pedidosRepository.fecharPedido(id_usuario)
        res.json(row)
    },

    async consultarPedido(req,res){
        const {id_pedido} = req.body
        const row = await pedidosRepository.consultarPedido(id_pedido)
        res.json(row)
    },
    
    async avaliarProduto(req,res){
        const {id_usuario, id_produto, nota} = req.body
        const row = await pedidosRepository.avaliarProduto(id_usuario, id_produto, nota)
        res.json(row)
    },

    async maisVendido(req,res){
        const row = await pedidosRepository.maisVendido()
        res.json(row)
    },

    async totalVendido(req, res){
        const row = await pedidosRepository.totalVendido()
        res.json(row)
    }






}