const pool = require('../bando de dados/conexao')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const senhaSegura = require('../senhaJwt')

async function cadastrarUsuario(req, res) {
    const { nome, email, senha } = req.body
    try {
        if (!nome || !email || !senha) {
            return res.status(400).json({
                mansagem: 'Todos os campos são obrigatórios!'
            })
        }

        let senhaCriptografada = await bcrypt.hash(senha, 10)

        const criarUsuario = await pool.query(`insert into usuarios (nome, email, senha) values ($1, $2, $3) returning id, nome, email`, [nome, email, senhaCriptografada])

        return res.status(201).json(criarUsuario.rows[0])

    } catch (error) {
        return res.json({ mensagem: error.message })
    }

}

async function todosUsuarios(req, res) {
    const listaUsuarios = await pool.query('select nome, email from usuarios')

    return res.json(listaUsuarios.rows)
}

async function loginUsuario(req, res) {
    const { email, senha } = req.body

    try {
        if (!email || !senha) {
            return res.status(400).json({
                mansagem: 'É necessário informar o Email e a senha para fazer login!'
            })
        }

        const usuario = await pool.query('select * from usuarios where email = $1', [email])

        if (usuario.rowCount < 1) {
            return res.status(404).json({ mensagem: 'Email ou senha invalido!' })
        }

        const verificarSenha = await bcrypt.compare(senha, usuario.rows[0].senha)

        if (!verificarSenha) {
            return res.status(400).json({ mensagem: 'Email ou senha invalido!' })
        }

        const token = jwt.sign({ id: usuario.rows[0].id }, senhaSegura, { expiresIn: '1d' })

        const { senha: newPass, ...userLogado } = usuario.rows[0]

        return res.json({ usuario: userLogado, token })

    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

async function perfilLogado(req, res) {
    return res.json(req.usuario)
}

async function atualizarPerfil(req, res) {
    const { nome, email, senha } = req.body

    try {
        const senhaCriptografada = await bcrypt.hash(senha, 10)

        const atualizarPerfil = await pool.query(`update usuarios set nome = $1, email = $2, senha =$3 where id = $4 returning id, nome, email`, [nome, email, senhaCriptografada, req.usuario.id])

        return res.status(204).send()

    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

async function listarCategorias(req, res) {
    const listarCategorias = await pool.query(`select * from categorias`)

    return res.json(listarCategorias.rows)
}
module.exports = {
    cadastrarUsuario,
    loginUsuario,
    todosUsuarios,
    perfilLogado,
    atualizarPerfil,
    listarCategorias
}