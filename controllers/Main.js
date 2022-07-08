const Divulcacao = require('../models/Divulgacao')
const Mural = require("../models/Mural")

module.exports = class Main {
    static async principal (req, res) {
        const mural = await Mural.findAll()
        const murals = mural.map((result) => result.get({ plain: true }))
        
        const divulgacao = await Divulcacao.findAll({ where: { validado: 'sim'}})
        const divulgacoes = divulgacao.map((result) => result.get({ plain: true }))

        res.render('home', { murals, divulgacoes })
    }
}