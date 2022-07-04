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
            CPF: req.body.cpf
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
}