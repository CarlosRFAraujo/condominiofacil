const User = require('../models/User')
const Divulcacao = require('../models/Divulgacao')

module.exports = class Divulga {

    static async criar (req, res) {
        const userid = req.session.userid

        const user = await User.findOne({ where: { id: userid }, raw: true })

        if (!userid) {
            req.flash('mensagem', 'Gentileza realizar o login novamente.')
            res.redirect('/login')
        }

        res.render('divulga/criar', { user })
    }
    
    static async criarPost (req, res) {
        const userid = req.session.userid

        const user = await User.findOne({ where: { id: userid }, raw: true })

        const divulgacao = {
            categoria: req.body.categoria,
            titulo: req.body.titulo,            
            descricao: req.body.descricao,
            valor: parseFloat(req.body.valor),
            apartamento: req.body.apartamento,
            bloco: req.body.bloco,
            CPF: req.body.cpf,
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
}