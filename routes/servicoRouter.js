const express = require('express')
const authAdmin = require('../helpers/authAdmin').verificaAdmin
const servicosController = require('../controllers/ServicosController')


const servicosRouter = express.Router()

servicosRouter.get('/servicos', authAdmin, servicosController.listarServicos)

module.exports = servicosRouter