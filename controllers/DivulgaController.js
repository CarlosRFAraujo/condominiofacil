const User = require('../models/User')
const Admin = require('../models/Admin')
const Divulcacao = require('../models/Divulgacao')

module.exports = class Divulga {

    static async criar (req, res) {
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

        res.render('divulga/criar', { user })
    }
    
    static async criarPost (req, res) {
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

        const divulgacao = {
            categoria: req.body.categoria,
            titulo: req.body.titulo,            
            descricao: req.body.descricao,
            valor: parseFloat(req.body.valor),
            UserId: userid
        }

        if ((divulgacao.categoria == 'aluguel') | (divulgacao.categoria == 'venda')) {
            if (user.proprietario != 'sim') {
                req.flash('mensagem', 'Usuário não possui autorização este tipo de divulgação')
                res.redirect('/divulgar/criar')

                return
            }
            
        }

        try {
            await Divulcacao.create(divulgacao)

            req.flash('mensagem', 'Divulgação criada com sucesso, a mesma será validada pela Administração do condomínio e estará divulgada na home em até 24 horas, caso não tenha nenhuma irregularidade.')
            res.redirect('/')

        } catch (error) {
            console.log(error)
            res.redirect('/divulgar/criar')
        }

    }

    static async listar (req, res) {
        const userid = req.session.userid

        if (!userid) {
            req.flash('mensagem', 'Gentileza realizar login novamente')
            res.redirect('/login')
            return
        }
        
        const divulgacao = await Divulcacao.findAll({
            where: {
                UserId: userid
            }
        })

        const divulgacoes = divulgacao.map((result) => result.get({ plain: true }))

        res.render('divulga/listar', { divulgacoes })
    }

    static async sindico (req, res) {

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

        const admin = await Admin.findOne({ where: { id: adminid }, raw: true })

        if (admin.funcao != 'sindico') {
            if (admin.funcao != 'subsindico') {
                req.flash('mensagem', 'Usuário não possui altorização para acesso a esta função.')
                res.redirect('/')

                return
            }
            
        }

        const divulgacao = await Divulcacao.findAll({ include: User })
        const divulgacoes = divulgacao.map((result) => result.get({ plain: true }))

        res.render('divulga/dashboard', { divulgacoes })
    }

    static async validar (req, res) {
        const adminid = req.session.adminid

        if (!adminid) {
            res.redirect('/adm')

            return
        }

        if(adminid == 99999) {
            req.flash('mensagem', 'Usuário não possui altorização para acesso a esta função.')
            res.redirect('/adm/')

            return
        }

        const admin = await Admin.findOne({ where: { id: adminid }, raw: true })

        if (admin.funcao != 'sindico') {
            if (admin.funcao != 'subsindico') {
                req.flash('mensagem', 'Usuário não possui altorização para acesso a esta função.')
                res.redirect('/adm/')

                return
            }
            
        }

        const divulgacao = {
            id: req.body.id,
            validado: req.body.validado,
            motivo: req.body.motivo
        }

        try {
            await Divulcacao.update(divulgacao, { where: { id: divulgacao.id } })

            req.flash('mensagem', 'Divulgacão tratada com sucesso')
            res.redirect('/divulgar/pendentes')
            
        } catch (error) {
            console.log(error)
        }

    }

    static async pendentes (req, res) {

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

        const admin = await Admin.findOne({ where: { id: adminid }, raw: true })

        if (admin.funcao != 'sindico') {
            if (admin.funcao != 'subsindico') {
                req.flash('mensagem', 'Usuário não possui altorização para acesso a esta função.')
                res.redirect('/')

                return
            }
            
        }

        const divulgacao = await Divulcacao.findAll({ include: User })
        const divulgacoes = divulgacao.map((result) => result.get({ plain: true }))

        res.render('divulga/pendentes', { divulgacoes })
    }

    static async excluir (req, res) {
        const userid = req.session.userid

        const id = req.body.id

        if (!userid) {
            req.flash('mensagem', 'Gentileza realizar login!')
            res.redirect('/login')

            return
        }

        try {
            await Divulcacao.destroy({ where: { id: id }})

            req.flash('mensagem', 'Divulgação excluída com sucesso!')
            res.redirect('/divulgar/listar')
            
        } catch (error) {
            console.log(error)
        }
    }

    static async remove (req, res) {
        const adminid = req.session.adminid

        if (!adminid) {
            res.redirect('/adm')

            return
        }

        const admin = await Admin.findOne({ where: { id: adminid } })

        if (admin.funcao != 'sindico') {
            if (admin.funcao != 'subsindico') {
                req.flash('mensagem', 'Usuário não possui altorização para acesso a esta função.')
                res.redirect('/adm/')

                return
            }
            
        }

        const id = req.body.id

        try {
            await Divulcacao.destroy({ where: { id: id }})

            req.flash('mensagem', 'Divulgação excluída com sucesso!')
            res.redirect('/divulgar/divulgacoes')
            
        } catch (error) {
            console.log(error)
        }
    }
}