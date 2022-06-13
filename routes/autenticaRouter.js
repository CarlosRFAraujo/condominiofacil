const express = require('express')
const router = express.Router()
const Autentica = require('../controllers/AutenticaController')

router.get('/login', Autentica.login )

router.get('/registrar', Autentica.registrar)

router.post('/registrar', Autentica.registrarPost)

router.get('/logout', Autentica.logout)


module.exports = router