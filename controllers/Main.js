const Mural = require("../models/Mural")

module.exports = class Main {
    static async principal (req, res) {
        const mural = await Mural.findAll()
        const murals = mural.map((result) => result.get({ plain: true }))
        res.render('home', { murals })
    }
}