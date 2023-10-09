const express = require('express')
const app = express()
require('dotenv').config()

const rotas = require('./rotas')


app.use(express.json())

app.use(rotas)

app.listen(process.env.PORT, () => {
    console.log(`Rodando na porta ${process.env.PORT}`)
})