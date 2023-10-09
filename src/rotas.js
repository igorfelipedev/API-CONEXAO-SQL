const { Router } = require('express')
const rotas = Router()

const usuarios = require('./controladores/usuarios')
const transacoes = require('./controladores/transacoes')
const intermediario = require('./intermediarios')


rotas.post('/usuario', intermediario.email, usuarios.cadastrarUsuario)
rotas.post('/login', usuarios.loginUsuario)
rotas.get('/usuarios', usuarios.todosUsuarios)

rotas.use(intermediario.verificacoToken)

rotas.get('/usuario', usuarios.perfilLogado)

rotas.put('/usuario', intermediario.email, intermediario.camposObrigatorios, usuarios.atualizarPerfil)
rotas.get('/categoria', usuarios.listarCategorias)
rotas.get('/transacao/extrato', transacoes.obterExtrato)
rotas.get('/transacao/:id', transacoes.detalharTransacao)
rotas.put('/transacao/:id', intermediario.verificarCategoria, transacoes.atualizarTransacao)
rotas.delete('/transacao/:id', transacoes.deletarTransacao)
rotas.post('/transacao', transacoes.cadastrarTransacao)
rotas.get('/transacao', transacoes.listarTransacao)

rotas.get('/transacao/:id', transacoes.detalharTransacao)

rotas.put('/transacao/:id', intermediario.verificarCategoria, transacoes.atualizarTransacao)

rotas.delete('/transacao/:id', transacoes.deletarTransacao)

module.exports = rotas