const { Op } = require('sequelize')

const Divulcacao = require('../models/Divulgacao')
const Mural = require("../models/Mural")
const User = require('../models/User')

module.exports = class Main {
    static async principal (req, res) {

        let buscar = ''
        let orden = 'DESC'
        let categoria = ''
        
        if(req.query.busca) {
            buscar = req.query.busca
        }
        
        if(req.query.ordenar == 'velho') {
            orden = 'ASC'
        } else {
            orden = 'DESC'
        }

        if(req.query.categoria){
            categoria = req.query.categoria
        }

        const mural = await Mural.findAll()
        const murals = mural.map((result) => result.get({ plain: true }))
        
        const divulgacao = await Divulcacao.findAll({
            include: User,
            where: {
                categoria: {
                    [Op.like]: `%${categoria}%`
                },
                titulo: {
                    [Op.like]: `%${buscar}%`
                },
                validado: 'sim'
            },            
            order: [['createdAt', orden]],
        })

        const divulgacoes = divulgacao.map((result) => result.get({ plain: true }))

        res.render('home', { murals, divulgacoes })
    }
}