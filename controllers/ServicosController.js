const AdminModels = require('../models/Admin')
const User = require('../models/User')
const Servico = require('../models/Servico')

module.exports = class ReclamacaoController {
/*

    static async solicitar (req, res) {        
        
    }

    static async solicitarPost (req, res) {

    }
*/
    static async listarServicos (req, res) {

        const adminId = req.session.adminid

        const admin = await AdminModels.findOne({ where: { id: adminId }, raw: true })

        const servico = await Servico.findAll()

        const servicos = servico.map((result) => result.get({ plain: true }))

        res.render('sindico/servico/listarsolicitacoes', { servicos })

    }
/*
    static async validarPost (req, res) {

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

    static async executar (req, res) {


    }
    static async executarPost (req, res) {


    }
*/
}