const AdminModels = require('../models/Admin')
const User = require('../models/User')
const Reclamacao = require('../models/Reclamacao')

module.exports = class ReclamacaoController {

    static async reclamar (req, res) {

        const userid = req.session.userid

        if (!userid) {
            req.flash('mensagem', 'Gentileza realizar login novamente')
            res.redirect('/login')
            return
        }

        const user = await User.findOne({ where: { id: userid }, raw: true })

        if (!user) {
            req.flash('mensagem', 'Gentileza realizar o login novamente.')
            res.redirect('/login')
        }

        res.render('reclamacao/criar', { user })
            
    }

    static async reclamarPost (req, res) {

        const userid = req.session.userid

        if (!userid) {
            req.flash('mensagem', 'Gentileza realizar login novamente')
            res.redirect('/login')
            return
        }

        const user = await User.findOne({ where: { id: userid }, raw: true })

        if (!user) {
            req.flash('mensagem', 'Gentileza realizar o login novamente.')
            res.redirect('/login')

            return
        }

        const reclamacao = {
            tipoReclamacao: req.body.tipoReclamacao,
            descricaoOcorrido: req.body.descricaoOcorrido,
            Verificada: false,
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

        if (!userid) {
            req.flash('mensagem', 'Gentileza realizar login novamente')
            res.redirect('/login')
            return
        }

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

        if (!userid) {
            req.flash('mensagem', 'Gentileza realizar login novamente')
            res.redirect('/login')
            return
        }

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

        const adminid = req.session.adminid

        if (!adminid) {
            res.redirect('/adm')

            return
        }

        if(adminid == 99999) {
            req.flash('mensagem', 'Usuário não possui altorização para acesso a esta função.')
            res.redirect('/')

            return
        }

        const admin = await AdminModels.findOne({ where: { id: adminid }, raw: true })

        if (admin.funcao != 'sindico') {
            if (admin.funcao != 'subsindico') {
                req.flash('mensagem', 'Usuário não possui altorização para acesso a esta função.')
                res.redirect('/')

                return
            }
            
        }

        const reclamacao = await Reclamacao.findAll({ include: User })

        const reclamacoes = reclamacao.map((result) => result.get({ plain: true }))

        res.render('reclamacao/listareclamacao', { reclamacoes })

    }

    static async atender(req, res) {
        const adminid = req.session.adminid

        if (!adminid) {
            res.redirect('/adm')

            return
        }

        if(adminid == 99999) {
            req.flash('mensagem', 'Usuário não possui altorização para acesso a esta função.')
            res.redirect('/')

            return
        }

        const admin = await AdminModels.findOne({ where: { id: adminid }, raw: true })

        if (admin.funcao != 'sindico') {
            if (admin.funcao != 'subsindico') {
                req.flash('mensagem', 'Usuário não possui altorização para acesso a esta função.')
                res.redirect('/')

                return
            }
            
        }

        const id = req.body.id

        const rec = {
            Verificada: req.body.Verificada === '0' ? false : true,
            solucao: req.body.solucao
        }

        try {
            await Reclamacao.update(rec, { where: { id: id } })

            req.flash('mensagem', 'Reclamação atendida com sucesso!')
            res.redirect('/adm') 

        } catch (error) {
            console.log(error)
        }

        
    }

    static async atendidas (req, res) {
        const adminid = req.session.adminid

        if (!adminid) {
            res.redirect('/adm')

            return
        }

        if(adminid == 99999) {
            req.flash('mensagem', 'Usuário não possui altorização para acesso a esta função.')
            res.redirect('/')

            return
        }

        const admin = await AdminModels.findOne({ where: { id: adminid }, raw: true })

        if (admin.funcao != 'sindico') {
            if (admin.funcao != 'subsindico') {
                req.flash('mensagem', 'Usuário não possui altorização para acesso a esta função.')
                res.redirect('/')

                return
            }
            
        }

        const reclamacao = await Reclamacao.findAll({ include: User })

        const reclamacoes = reclamacao.map((result) => result.get({ plain: true }))

        res.render('reclamacao/atendidas', { reclamacoes })
    }
}