const express = require('express')
const authAdmin = require('../helpers/authAdmin').verificaAdmin
const authUser = require('../helpers/authUser').verificaUser
const SugestaoController = require('../controllers/SugestaoController')


const sugestaoRouter = express.Router()

sugestaoRouter.get('/sugerir', authUser, SugestaoController.sugerir)

sugestaoRouter.post('/sugerir', authUser, SugestaoController.sugerirpost)

module.exports = sugestaoRouter