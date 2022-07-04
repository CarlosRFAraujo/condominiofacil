const express = require('express')
const authAdmin = require('../helpers/authAdmin').verificaAdmin
const ReclamacaoController = require('../controllers/ReclamacaoController')


const reclamacaoRouter = express.Router()

reclamacaoRouter.get('/reclamacoes', authAdmin, ReclamacaoController.listarReclamacao)

module.exports = reclamacaoRouter