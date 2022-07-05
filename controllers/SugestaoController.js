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
}