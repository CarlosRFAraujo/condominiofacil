const express = require('express')
const authAdmin = require('../helpers/authAdmin').verificaAdmin
const authUser = require('../helpers/authUser').verificaUser
const ServicosController = require('../controllers/ServicosController')


const servicosRouter = express.Router()

servicosRouter.get('/solicitar', authUser, ServicosController.solicitar)

servicosRouter.post('/solicitar', authUser, ServicosController.solicitarPost)

servicosRouter.get('/minhas', authUser, ServicosController.minhas)

servicosRouter.post('/excluir', authUser, ServicosController.excluir)

servicosRouter.get('/servicos', authAdmin, ServicosController.listarServicos)

module.exports = servicosRouter