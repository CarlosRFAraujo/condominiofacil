const express = require('express')
const router = express.Router()
const User = require('../controllers/UserController')

const authAdmin = require('../helpers/authAdmin').verificaAdmin
const authUser = require('../helpers/authUser').verificaUser

router.get('/login', User.login )

router.post('/login', User.loginPost)

router.get('/registrar', authAdmin, User.registrar)

router.post('/registrar', authAdmin, User.registrarPost)

router.get('/alterar', authUser, User.alterar)

router.post('/alterar', authUser, User.alterarPost)

router.get('/listar', authAdmin, User.listarUsers)

router.post('/resetsenha', authAdmin, User.reset)

router.post('/remover', authAdmin, User.remove)

router.get('/logout', User.logout)


module.exports = router