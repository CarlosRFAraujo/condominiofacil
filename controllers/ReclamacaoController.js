const AdminModels = require('../models/Admin')
const User = require('../models/User')
const Reclamacao = require('../models/Reclamacao')

module.exports = class ReclamacaoController {

    static async reclamar (req, res) {

        const userid = req.session.userid

        const user = await User.findOne({ where: { id: userid }, raw: true })

        if (!user) {
            req.flash('mensagem', 'Gentileza realizar o login novamente.')
            res.redirect('/login')
        }

        res.render('reclamacao/criar', { user })
            
    }

    static async reclamarPost (req, res) {

        const userid = req.session.userid

        const user = await User.findOne({ where: { id: userid }, raw: true })

        if (!user) {
            req.flash('mensagem', 'Gentileza realizar o login novamente.')
            res.redirect('/login')

            return
        }

        const reclamacao = {
            tipoReclamacao: req.body.tipoReclamacao,
            descricaoOcorrido: req.body.descricaoOcorrido,
            UserId: userid
        }

        try {
            await Reclamacao.create(reclamacao)

            req.flash('mensagem', 'Reclamação criada com sucesso! Acompanhar solução da mesma nas suas reclamações')
            res.redirect('/rec/minhas')

        } catch (error) {
            console.log(error)
        }        

    }

    static async minhasRec (req, res) {
        const userid = req.session.userid

        const user = await User.findOne({ where: { id: userid }, raw: true })

        if (!user) {
            req.flash('mensagem', 'Gentileza realizar o login novamente.')
            res.redirect('/login')

            return
        }

        const rec = await Reclamacao.findAll({ where: { UserId: userid }})
        const reclamacoes = rec.map((result) => result.get({ plain: true }))

        res.render('reclamacao/minhas', { reclamacoes })

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
            await Reclamacao.destroy({ where: { id: id, UserId: userid }})

            req.flash('mensagem', 'Reclamação excluída com sucesso')
            res.redirect('/rec/minhas')
            
        } catch (error) {
            console.log(error)
        }
    }

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