const AdminModels = require('../models/Admin')
const Mural = require('../models/Mural')

module.exports = class MuralController {

    static async criaMural (req, res) {

        const adminId = req.session.adminid

        const admin = await AdminModels.findOne({ where: { id: adminId }, raw: true })

        if (admin.funcao != 'sindico') {
            if (admin.funcao != 'subsindico') {
                req.flash('mensagem', 'Usuário não possui permissão para criação de aviso ou circular')
                res.render('sindico/adm')

                return
            }       
        }
        
        res.render('sindico/mural/criamural', { admin })
        
    }

    static async criaMuralPost (req, res) {

        const mural = {
            titulo: req.body.titulo,
            texto: req.body.texto,
            cpf: req.body.cpf,
            nome: req.body.nome,
            AdminId: req.session.adminid
        }

        console.log(mural)

        try {
            await Mural.create(mural)

            req.flash('mensagem', 'Aviso criado com sucesso')
            res.redirect('/adm/')
                        

        } catch (error) {
            console.log(error)
        }
    }

    static async listarMural (req, res) {

        const adminId = req.session.adminid

        const admin = await AdminModels.findOne({ where: { id: adminId }, raw: true })

        if (admin.funcao != 'sindico') {
            if (admin.funcao != 'subsindico') {
                req.flash('mensagem', 'Usuário não possui permissão para criação de aviso ou circular')
                res.render('sindico/adm')

                return
            }       
        }

        const mural = await Mural.findAll()

        const murals = mural.map((result) => result.get({ plain: true }))

        res.render('sindico/mural/listarmural', { murals })

    }

    static async editar (req, res) {
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

        const mural = await Mural.findOne({ where: { id: id }, raw: true })
                        
        res.render('sindico/mural/editar', { mural })
    }

    static async editarPost (req, res) {

        const adminId = req.session.adminid

        const admin = await AdminModels.findOne({ where: { id: adminId }, raw: true })

        if (admin.funcao != 'sindico') {
            if (admin.funcao != 'subsindico') {
                req.flash('mensagem', 'Usuário não possui permissão para criação de aviso ou circular')
                res.render('sindico/adm')

                return
            }       
        }

        const id = req.body.id
        const mural = {
            titulo: req.body.titulo,
            texto: req.body.texto,
        }

        try {
            await Mural.update(mural, { where: { id: id } })

            req.flash('mensagem', 'Aviso atualizado com sucesso')
            req.session.save(() => {
                res.redirect('/adm/')
            })

        } catch (error) {

            console.log(error)

        }
        
    }

    static async remover (req, res) {

        const adminId = req.session.adminid

        const id = req.body.id

        const admin = await AdminModels.findOne({ where: { id: adminId }, raw: true })

        if (admin.funcao != 'sindico') {
            if (admin.funcao != 'subsindico') {
                req.flash('mensagem', 'Usuário não possui permissão para criação de aviso ou circular')
                res.render('sindico/adm')

                return
            }       
        }

        try {

            await Mural.destroy({ where: { id: id, AdminId: adminId } })

            req.flash('mensagem', 'Aviso excluído com sucesso')
            req.session.save(() => {
                res.redirect('/adm/')
            })

        } catch (error) {
            console.log(error)
        }        


    }
}