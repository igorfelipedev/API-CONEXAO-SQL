const pool = require('../bando de dados/conexao')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const senhaSegura = require('../senhaJwt')
const { listarCategorias } = require('./usuarios')

async function cadastrarTransacao(req, res) {
    const { descricao, valor, data, categoria_id, tipo } = req.body

    const { id } = req.usuario

    if (!descricao || !valor || !data || !categoria_id || !tipo) {
        return res.status(400).json({ mensagem: 'Informe descrição, valor, data, categoria_id e tipo pois são obrigatórios' })
    }

    try {
        const verificarCategoria = await pool.query('select * from categorias where id = $1', [categoria_id])

        if (!verificarCategoria.rowCount) {
            return res.status(404).json({ mensagem: 'Categoria não encontrada!' })
        }

        if (tipo !== 'entrada' && tipo !== 'saida') {
            return res.status(400).json({ mensagem: 'Informe o tipo como entrada ou saida' })
        }

        const { rows } = await pool.query(`insert into transacoes (descricao, valor, data, categoria_id, usuario_id, tipo) values($1,$2,$3,$4,$5,$6) returning *`, [descricao, valor, data, categoria_id, id, tipo])

        return res.status(201).json(rows[0])

    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

async function obterExtrato(req, res) {
    try {
        const extratoEntrada = await pool.query('select sum(valor) from transacoes where tipo = $1', ['entrada'])
        const somaEntrada = extratoEntrada.rows[0].sum

        const extratoSaida = await pool.query('select sum(valor) from transacoes where tipo = $1', ['saida'])
        const somaSaida = extratoSaida.rows[0].sum

        const resultado = {
            entrada: somaEntrada,
            saida: somaSaida
        }
        return res.json(resultado)
    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

async function detalharTransacao(req, res) {
    const { id: idTransacao } = req.params

    const { id: idUsuario } = req.usuario

    if (!idTransacao) {
        return res.status(404).json({ mensagem: 'Transação não encontrada.' })
    }

    try {
        const resultado = await pool.query('select * from transacoes where id = $1 and usuario_id = $2', [idTransacao, idUsuario])

        if (resultado.rowCount < 1) {
            return res.status(404).json({ mensagem: 'Transação não encontrada.' })
        }

        return res.status(200).json(resultado.rows[0])

    } catch (error) {
        return res.status(500).json({ mensagem: error.message })

    }
}

async function atualizarTransacao(req, res) {

    const { id: idUsuario } = req.usuario

    const { id: idTransacao } = req.params

    const { descricao, valor, data, categoria_id, tipo } = req.body

    if (!descricao || !valor || !data || !categoria_id || !tipo) {
        return res.status(400).json({ mensagem: 'Todos os campos devem ser preenchidos.' })
    }

    try {
        const resultado = await pool.query('select * from transacoes where id = $1 and usuario_id = $2', [idTransacao, idUsuario])

        if (!resultado.rowCount) {
            return res.status(404).json({ mensagem: 'Transação não encontrada.' })
        }

        const transacaoAlterado = await pool.query(`update transacoes 
        set id = $1,
        descricao = $2,
        valor = $3,
        data = $4,
        categoria_id = $5,
        usuario_id = $6,
        tipo = $7
        where id = $1 and
        usuario_id = $6`, [idTransacao, descricao, valor, data, categoria_id, idUsuario, tipo])

        return res.status(200).json({})

    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

async function deletarTransacao(req, res) {
    const { id: idUsuario } = req.usuario

    const { id: idTransacao } = req.params

    try {

        const resultado = await pool.query('select * from transacoes where id = $1 and usuario_id = $2', [idTransacao, idUsuario])

        if (!resultado.rowCount) {
            return res.status(404).json({ mensagem: 'Transação não encontrada.' })
        }

        const apagarTransacao = await pool.query('delete from transacoes where id = $1 and usuario_id = $2', [idTransacao, idUsuario])

        return res.status(204).json()

    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

async function listarTransacao(req, res) {
    const { id } = req.usuario
    const { filtro } = req.query
    const resultado = []

    try {
        if (!filtro) {

            const listarTransacao = await pool.query('select * from transacoes where usuario_id = $1', [id])

            return res.json(listarTransacao.rows)
        } else {

            for (let categoria of filtro) {
                const listaFiltrada = await pool.query('select * from transacoes where descricao ilike $1 and usuario_id = $2', [categoria, id])
                resultado.push(...listaFiltrada.rows)
            }

            return res.status(200).json(resultado)
        }

    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

async function obterExtrato(req, res) {
    try {
        const extratoEntrada = await pool.query('select sum(valor) from transacoes where tipo = $1', ['entrada'])
        const somaEntrada = +extratoEntrada.rows[0].sum

        const extratoSaida = await pool.query('select sum(valor) from transacoes where tipo = $1', ['saida'])
        const somaSaida = +extratoSaida.rows[0].sum

        const resultado = {
            entrada: somaEntrada,
            saida: somaSaida
        }
        return res.json(resultado)
    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

module.exports = {
    cadastrarTransacao,
    listarTransacao,
    obterExtrato,
    detalharTransacao,
    atualizarTransacao,
    deletarTransacao
}