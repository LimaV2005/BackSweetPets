const { Router } = require('express')
const router = Router()
const cadastroController = require('./controller/cadastroController.js')
const loginverify = require('./middleware/loginverify.js')
const produtoController = require('./controller/produtoController.js')
const adminverify = require('./middleware/adminverify.js')
const carrinhoController = require('./controller/carrinhoController.js')
const listadesejosController = require('./controller/listadesejosController.js')
const pedidosController = require('./controller/pedidosController.js')
const mandarEmail = require('./utils/mandarEmail.js')



// ROTAS TIPO GET ----------------
router.get('/', (req,res)=>{
    res.json("oi regis my love")
})
router.get('/all', cadastroController.find)// achar todos
router.get('/one', loginverify ,cadastroController.findOne)// achar 1 pelo id
router.get('/prod', produtoController.allProducts)// todos os produtos
router.get('/carrinho', loginverify, carrinhoController.consultaCarrinho) // consulta carrinho
router.get('/lista', loginverify, listadesejosController.consultaLista)// consulta lista de desejos
router.get('/pedidos', loginverify, pedidosController.consultarPedido) // consultar pedido
router.get('/totalusuarios', adminverify, cadastroController.todosUsuarios)//contar todos os pedidos
router.get('/produtosvendidos', loginverify, pedidosController.maisVendido)// produto mais vendido
router.get('/maiorcomprador', adminverify, cadastroController.maiorComprador)// maior comprador
router.get('/totalvendas', adminverify, pedidosController.totalVendido)//


// ROTAS TIPO PUT ---------------
router.put('/atualizar', cadastroController.update)// atualizar cadastro
router.put('/atualizar/produto', loginverify, adminverify, produtoController.updateProduct) // atualizar produto

//ROTAS TIPO POST ---------------
router.post('/criar', cadastroController.store)//criar usuário
router.post('/login', cadastroController.login)//login com token
router.post('/add', loginverify, adminverify, produtoController.addProduto) // add produto
// router.post('/buy', loginverify, mandarEmail , produtoController.buyProduct) // comprar produto só logado
router.post('/addCarrinho', loginverify, carrinhoController.addCarrinho) // adicionar ao carrinho
router.post('/addLista', loginverify, listadesejosController.addLista) // add a lista
router.post('/fechar', loginverify, mandarEmail, pedidosController.fecharPedido)//  fechar pedido
router.post('/avaliar', loginverify, pedidosController.avaliarProduto) // avaliar produto


//ROTAS DELETE   --------------
router.delete('/del', cadastroController.delete)//deletar usuário
router.delete('/carrinhodel', loginverify, carrinhoController.removeCarrinho)//remover do carrinho
router.delete('/listadel', loginverify, listadesejosController.removeLista)//remover da lista de desejos
router.delete('/resetcarrinho', carrinhoController.deletarCarrinho) //resetar carrinho





module.exports = router