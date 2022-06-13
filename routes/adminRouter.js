const express = require('express')

const adminRouter = express.Router()
const Admin = require('../controllers/AdminController')

const verificaAdmin = require('../helpers/authAdmin').verificaAdmin

adminRouter.get('/loginAdmin', Admin.loginAdm)

adminRouter.post('/loginAdmin', Admin.loginAdmPost)

adminRouter.get('/logoutAdmin', Admin.logoutAdm)

adminRouter.get('/registraAdmin', verificaAdmin, Admin.registraadm)

adminRouter.get('/',verificaAdmin, Admin.home)

module.exports = adminRouter    