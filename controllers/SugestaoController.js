const Sugestao = require('../models/Sugestao')
const AdminModels = require('../models/Admin')
const User = require('../models/User')

module.exports = class SugestaoController {

    static async sugerir (req, res) {
        const userid = req.session.userid

        const user = await User.findOne({ where: { id: userid } })

        if (!user) {
            req.flash('mensagem', 'Gentileza realizar login novamente!')
            res.redirect('/login')

            return
        }

        res.render('sugestao/sugerir')
    }

    static async sugerirpost (req, res) {
        const userid = req.session.userid

        const user = await User.findOne({ where: { id: userid } })

        if (!user) {
            req.flash('mensagem', 'Gentileza realizar login novamente!')
            res.redirect('/login')

            return
        }

        const sugestao = {
            sugestao: req.body.sugestao,
            UserId: userid
        }

        try {
            await Sugestao.create(sugestao)

            req.flash('mensagem', 'Obrigado pela sua sugestão! vamos analisá-la com atenção.')
            res.redirect('/')
            
        } catch (error) {
            console.log(error)
        }
    }

    static async listar (req, res){
        const adminid = req.session.adminid

        if (!adminid) {
            res.redirect('/adm')

            return
        }

        if(adminid == 99999) {
            req.flash('mensagem', 'Usuário não possui altorização para acesso a esta função.')
            res.redirect('/adm')

            return
        }

        const admin = await AdminModels.findOne({ where: { id: adminid }, raw: true })

        if (admin.funcao != 'sindico') {
            if (admin.funcao != 'subsindico') {
                req.flash('mensagem', 'Usuário não possui altorização para acesso a esta função.')
                res.redirect('/adm')

                return
            }
            
        }

        const sugestao = await Sugestao.findAll({ include: User })

        const sugestoes = sugestao.map((result) => result.get({ plain: true }))

        res.render('sugestao/listar', { sugestoes })

    }
}