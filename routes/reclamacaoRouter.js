const express = require('express')
const authAdmin = require('../helpers/authAdmin').verificaAdmin
const authUser = require('../helpers/authUser').verificaUser
const ReclamacaoController = require('../controllers/ReclamacaoController')


const reclamacaoRouter = express.Router()

reclamacaoRouter.get('/criar', authUser, ReclamacaoController.reclamar)

reclamacaoRouter.post('/criar', authUser, ReclamacaoController.reclamarPost)

reclamacaoRouter.get('/minhas', authUser, ReclamacaoController.minhasRec)

reclamacaoRouter.post('/excluir', authUser, ReclamacaoController.excluir)

reclamacaoRouter.get('/reclamacoes', authAdmin, ReclamacaoController.listarReclamacao)

module.exports = reclamacaoRouter