const express = require('express')

const Divulga = require('../controllers/DivulgaController')

const authUser = require('../helpers/authUser').verificaUser

const divulgaRouter = express.Router()

divulgaRouter.get('/criar', authUser, Divulga.criar)

divulgaRouter.post('/criar', authUser, Divulga.criarPost)

module.exports = divulgaRouter