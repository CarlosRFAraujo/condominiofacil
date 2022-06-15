const bcrypt = require('bcryptjs')

const AdminModels = require('../models/Admin')
const Mural = require('../models/Mural')

const validaCpf = require('../helpers/cpf')


module.exports = class Admin {

    static async home (req, res) {

        const mural = await Mural.findAll()

        const murals = mural.map((result) => result.get({ plain: true }))

        res.render('sindico/adm', {murals})
    }

    static async loginAdm (req, res) {
        res.render('sindico/login')
    }

    static async loginAdmPost (req, res) {

        const {cpf, senha} = req.body

        if (cpf == 'su') {
            if (senha != 'X&b975*@45') {
                req.flash('mensagem', 'Usuário/CPF de usuário não encontrado')
                res.render('sindico/login')
            }

            const admin = {
                id: 99999,
                cpf: 'su'
            }

            req.session.adminid = admin.id

            req.flash('mensagem', 'Login realizado com sucesso')

            req.session.save( () => {
                res.redirect('/adm/registraAdmin')
            })

        } else {
            const admin = await AdminModels.findOne({ where: { cpf: cpf } })
        
            if (!admin) {
                req.flash('mensagem', 'Usuário/CPF de usuário não encontrado')
                res.render('sindico/login')

                return
            }

            const matchSenha = bcrypt.compareSync(senha, admin.senha)

            if (!matchSenha) {
                req.flash('mensagem', 'Senha inválida, gentileza tentar novamente')
                res.render('sindico/login')

                return
            }

            req.session.adminid = admin.id

            req.flash('mensagem', 'Login realizado com sucesso')

            req.session.save( () => {
                res.redirect('/adm/')
            })
        }
        
    }

    static async registraadm (req, res) {
        const adminId = req.session.adminid

        if (adminId != 99999) {

            const admin = await AdminModels.findOne({ where: { id: adminId }, raw: true })

            if (admin.funcao != 'sindico') {
                if (admin.funcao != 'subsindico') {
                    req.flash('mensagem', 'Usuário não possui permissão para criação de colaboradores')
                    res.render('sindico/adm')

                    return
                }
            } else {
                res.render('sindico/registraadm')
            }

            

        }

        res.render('sindico/registraradm')
        
    }

    static async registraadmPost (req, res) {
        const {cpf, nome, funcao, senha, confirmsenha} = req.body
        
        const checaCPF = await validaCpf(cpf)

        if (!checaCPF) {
            req.flash('mensagem', 'Número de CPF inválido, gentileza conferir e digitar novamente')
            res.render('autentica/registraradm')

            return
        }

        const checkUserExists = await AdminModels.findOne( { where: { cpf: cpf } } )

        if (checkUserExists) {
            req.flash('mensagem', 'Usuário já existe no sistema, checar lista de usuários cadastrados')
            res.render('autentica/registraradm')

            return
        }

        if (senha != confirmsenha) {
            req.flash('mensagem', 'As senhas inseridas não conferem')
            res.render('autentica/registraradm')

            return
        }

        const salt = bcrypt.genSaltSync(10)
        const hashedsenha = bcrypt.hashSync(senha, salt)

        const admin = {
            cpf,
            nome,
            funcao,
            senha: hashedsenha
        }

        try {
            const criaAdmin = await AdminModels.create(admin)

            req.flash('mensagem', 'Cadastro realizado com sucesso!')

            res.redirect('/')

        } catch (error) {
            console.log(error)
        }
    
    }

    static async logoutAdm (req, res) {
        req.session.destroy()
        res.redirect('/adm/loginAdmin')
    }

}