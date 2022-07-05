const AdminModels = require('../models/Admin')
const User = require('../models/User')
const Servico = require('../models/Servico')

module.exports = class ReclamacaoController {


    static async solicitar (req, res) {
        
        const userid = req.session.userid

        const user = await User.findOne({ where: { id: userid }, raw: true })

        if (!user) {
            req.flash('mensagem', 'Gentileza realizar o login novamente.')
            res.redirect('/login')

            return
        }

        res.render('servico/solicitar')
        
    }

    static async solicitarPost (req, res) {

        const userid = req.session.userid

        const user = await User.findOne({ where: { id: userid }, raw: true })

        if (!user) {
            req.flash('mensagem', 'Gentileza realizar o login novamente.')
            res.redirect('/login')

            return
        }

        const servico = {
            servico: req.body.servico,
            observacao: req.body.observacao,
            UserId: userid
        }

        try {
            await Servico.create(servico)

            req.flash('mensagem', 'Solicitação de serviço criada com sucesso')
            res.redirect('/serv/minhas')

        } catch (error) {
            console.log(error)
        }

    }

    static async minhas (req, res) {
        const userid = req.session.userid

        const user = await User.findOne({ where: { id: userid }, raw: true })

        if (!user) {
            req.flash('mensagem', 'Gentileza realizar o login novamente.')
            res.redirect('/login')

            return
        }

        const serv = await Servico.findAll({ where: { UserId: userid }})
        const servicos = serv.map((result) => result.get({ plain: true }))

        res.render('servico/minhas', { servicos })
    }

    static async excluir (req, res) {
        const userid = req.session.userid

        const user = await User.findOne({ where: { id: userid }, raw: true })

        if (!user) {
            req.flash('mensagem', 'Gentileza realizar o login novamente.')
            res.redirect('/login')

            return
        }

        const id = req.body.id

        try {
            await Servico.destroy({where: { id: id } })

            req.flash('mensagem', 'Solicitação excluída com sucesso!')
            res.redirect('/serv/minhas')
            
        } catch (error) {
            console.log(error)
        }
    }

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