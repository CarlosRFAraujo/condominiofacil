const express = require('express')

const adminRouter = express.Router()
const Admin = require('../controllers/AdminController')

const verificaAdmin = require('../helpers/authAdmin').verificaAdmin

adminRouter.get('/',verificaAdmin, Admin.home)

adminRouter.get('/loginAdmin', Admin.loginAdm)

adminRouter.post('/loginAdmin', Admin.loginAdmPost)

adminRouter.get('/logoutAdmin', Admin.logoutAdm)

adminRouter.get('/registraAdmin', verificaAdmin, Admin.registraadm)

adminRouter.post('/registraAdmin', verificaAdmin, Admin.registraadmPost)

adminRouter.get('/consultarAdmin', verificaAdmin, Admin.consultar)

adminRouter.get('/editaradmin/:id', verificaAdmin, Admin.editarAdm)

adminRouter.post('/editaradmin', verificaAdmin, Admin.editarAdmPost)

adminRouter.post('/reset', verificaAdmin, Admin.resetSenha)

adminRouter.post('/removeradmin', verificaAdmin, Admin.removeAdm)

module.exports = adminRouter    