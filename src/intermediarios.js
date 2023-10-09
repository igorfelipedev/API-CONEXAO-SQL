const pool = require('./bando de dados/conexao')
const jwt = require('jsonwebtoken')
const senhaSegura = require('./senhaJwt')

async function email(req, res, next) {
    const { email } = req.body

    const emailExiste = await pool.query('select * from usuarios where email = $1', [email])

    if (emailExiste.rowCount) {
        return res.status(409).json({ mensagem: 'Já existe usuário cadastrado com o e-mail informado.' })
    }
    next()
}

async function verificacoToken(req, res, next) {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ mensagem: 'Não autorizado!' })
    }

    const token = authorization.split(' ')[1]

    try {
        const { id } = jwt.verify(token, senhaSegura)

        const { rows, rowCount } = await pool.query('select * from usuarios where id = $1', [id])

        if (rowCount < 1) {
            return res.status(401).json({ mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado.' })
        }
        const { senha, ...userLogado } = rows[0]

        req.usuario = userLogado

        next()
    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

async function camposObrigatorios(req, res, next) {
    const { nome, email, senha } = req.body
    try {
        if (!nome || !email || !senha) {
            return res.status(400).json({
                mansagem: 'Todos os campos são obrigatórios!'
            })
        }
        next()
    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }

}

async function verificarCategoria(req, res, next) {

    const { categoria_id, tipo } = req.body

    try {
        const verificarCategoria = await pool.query('select * from categorias where id = $1', [categoria_id])

        if (!verificarCategoria.rowCount) {
            return res.status(404).json({ mensagem: 'Categoria não encontrada!' })
        }

        if (tipo !== 'entrada' && tipo !== 'saida') {
            return res.status(400).json({ mensagem: 'Informe o tipo como entrada ou saida' })
        }
    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }

    next()
}

module.exports = {
    email,
    verificacoToken,
    camposObrigatorios,
    verificarCategoria
}