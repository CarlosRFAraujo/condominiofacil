const express = require('express')

const Divulga = require('../controllers/DivulgaController')

const authUser = require('../helpers/authUser').verificaUser
const autAdmin = require('../helpers/authAdmin').verificaAdmin

const divulgaRouter = express.Router()

divulgaRouter.get('/criar', authUser, Divulga.criar)

divulgaRouter.post('/criar', authUser, Divulga.criarPost)

divulgaRouter.get('/listar', authUser, Divulga.listar)

divulgaRouter.get('/pendentes', autAdmin, Divulga.pendentes)

divulgaRouter.get('/divulgacoes', autAdmin, Divulga.sindico)

divulgaRouter.post('/validar', autAdmin, Divulga.validar)

divulgaRouter.post('/excluir', authUser, Divulga.excluir)

divulgaRouter.post('/remover', autAdmin, Divulga.remove)

module.exports = divulgaRouter