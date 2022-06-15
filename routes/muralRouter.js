const express = require('express')

const Mural = require('../controllers/MuralController')

const authAdmin = require('../helpers/authAdmin').verificaAdmin

const muralRouter = express.Router()

muralRouter.get('/criaMural', authAdmin, Mural.criaMural)

muralRouter.post('/criaMural', authAdmin, Mural.criaMuralPost)

muralRouter.get('/listarMural', authAdmin, Mural.listarMural)

muralRouter.get('/editaMural/:id', authAdmin, Mural.editar)

muralRouter.post('/editaMural', authAdmin, Mural.editarPost)

muralRouter.post('/remover', authAdmin, Mural.remover)


module.exports = muralRouter