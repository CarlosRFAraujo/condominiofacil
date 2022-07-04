const AdminModels = require('../models/Admin')
const User = require('../models/User')
const Reclamacao = require('../models/Reclamacao')

module.exports = class ReclamacaoController {
/*
    static async reclamar (req, res) {        
        
    }

    static async reclamarPost (req, res) {

    }
*/
    static async listarReclamacao (req, res) {

        const adminId = req.session.adminid

        const admin = await AdminModels.findOne({ where: { id: adminId }, raw: true })

        if (admin.funcao != 'sindico') {
            if (admin.funcao != 'subsindico') {
                req.flash('mensagem', 'Usuário não possui permissão para criação de aviso ou circular')
                res.render('sindico/adm')

                return
            }       
        }

        const reclamacao = await Reclamacao.findAll()

        const reclamacoes = reclamacao.map((result) => result.get({ plain: true }))

        res.render('sindico/reclamacao/listareclamacao', { reclamacoes })

    }
/*
    static async veficicar (req, res) {
        const adminId = req.session.adminid

        const admin = await AdminModels.findOne({ where: { id: adminId }, raw: true })

        if (admin.funcao != 'sindico') {
            if (admin.funcao != 'subsindico') {
                req.flash('mensagem', 'Usuário não possui permissão para criação de aviso ou circular')
                res.render('sindico/adm')

                return
            }       
        }

        const id = req.params.id

        const reclamacao = await Reclamacao.findOne({ where: { id: id }, raw: true })
                        
        res.render('sindico/reclamacao/editar', { reclamacao })
    }

    static async verificarPost (req, res) {

        const adminId = req.session.adminid

        const admin = await AdminModels.findOne({ where: { id: adminId }, raw: true })

        if (admin.funcao != 'sindico') {
            if (admin.funcao != 'subsindico') {
                req.flash('mensagem', 'Usuário não possui permissão para criação de aviso ou circular')
                res.render('sindico/adm')

                return
            }       
        }

        
    }

    static async remover (req, res) {


    }
*/
}