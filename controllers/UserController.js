const bcrypt = require('bcryptjs')

const User = require('../models/User')
const AdminModels = require('../models/Admin')
const divulgacao = require('../models/Divulgacao')

const validaCpf = require('../helpers/cpf')
const Divulgacao = require('../models/Divulgacao')

module.exports = class Autentica {
    static async login (req, res) {
        res.render('autentica/autenticar')
    }

    static async loginPost (req, res) {
        const { cpf, senha } = req.body

        const user = await User.findOne({ where: { cpf: cpf } })

        if (!user) {
            req.flash('mensagem', 'CPF/usuário não encontrado, para cadastro de novo condômino, solicite à administração do condomínio!')
            res.redirect('/login')

            return
        }

        const matchSenha = bcrypt.compareSync(senha, user.senha)

        if (!matchSenha) {
            req.flash('mensagem', 'Senha inválida, gentileza tentar novamente')
            res.redirect('/login')

            return
        }

        req.session.userid = user.id

        req.flash('mensagem', 'Login realizado com sucesso')

        req.session.save( () => {
            res.redirect('/')
        })
    }

    static async registrar (req, res) {

        const adminId = req.session.adminid

        if (adminId != 99999) {

            const admin = await AdminModels.findOne({ where: { id: adminId }, raw: true })

            if (admin.funcao != 'sindico') {
                if (admin.funcao != 'subsindico') {
                    req.flash('mensagem', 'Usuário não possui permissão para criação de condôminos')
                    res.render('sindico/adm')

                    return

                }

            }           

            res.render('autentica/registrar',{ admin })

        } else {
            req.flash('mensagem', 'Usuário não possui permissão para criação de colaboradores')
            res.redirect('/adm/')
        }    

        
    }

    static async registrarPost (req, res) {
        const adminId = req.session.adminid

        if (adminId != 99999) {

            const admin = await AdminModels.findOne({ where: { id: adminId }, raw: true })

            if (admin.funcao != 'sindico') {
                if (admin.funcao != 'subsindico') {
                    req.flash('mensagem', 'Usuário não possui permissão para criação de condôminos')
                    res.render('sindico/adm')

                    return

                }

            }
        }
        
        const {cpf, nome, apartamento, bloco, senha, confirmsenha, proprietario, cpfValidador} = req.body

        const checaCPF = await validaCpf(cpf)

        if (!checaCPF) {
            req.flash('mensagem', 'Número de CPF inválido, gentileza conferir e digitar novamente')
            res.render('autentica/registrar')

            return
        }

        const checkUserExists = await User.findOne({ where: { cpf: cpf } })

        if (checkUserExists) {
            req.flash('mensagem', 'CPF já existe no sistema, caso tenha esquecido a senha, solicitar reset')
            res.render('autentica/registrar')

            return
        }

        const checkApto = await User.findOne({ where: { apartamento: apartamento }, subQuery: { bloco: bloco } })

        if (checkApto) {
            if (proprietario == checkApto.proprietario){

                req.flash('mensagem', 'Só pode haver um usuário propriétario e um usuário não proprietário por apartamento')
                res.render('autentica/registrar')

                return
            }
            
        }

        if (senha != confirmsenha) {
            req.flash('mensagem', 'As senhas inseridas não conferem')
            res.render('autentica/registrar')

            return
        }

        const salt = bcrypt.genSaltSync(10)
        const hashedsenha = bcrypt.hashSync(senha, salt)

        const user = {
            cpf,
            nome,
            apartamento,
            bloco,            
            senha: hashedsenha,
            proprietario,
            cpfValidador,
            AdminId: adminId,
        }

        try {
            const criaUser = await User.create(user)

            req.flash('mensagem', 'Cadastro realizado com sucesso!')

            res.redirect('/')

        } catch (error) {
            console.log(error)
        }

    }

    static async listarUsers (req, res) {

        const adminId = req.session.adminid

        if (adminId != 99999) {

            const admin = await AdminModels.findOne({ where: { id: adminId }, raw: true })

            if (admin.funcao != 'sindico') {
                if (admin.funcao != 'subsindico') {
                    req.flash('mensagem', 'Usuário não possui permissão para criação de condôminos')
                    res.render('sindico/adm')

                    return

                }

            }           

            const user = await User.findAll()

            const users = user.map((resultado) => resultado.get({ plain: true }))

            res.render('autentica/listauser', { users })

        } else {
            req.flash('mensagem', 'Usuário não possui permissão para criação de condôminos')
            res.redirect('/adm/')
        }    

        
    }

    static async reset (req, res) {
        const adminId = req.session.adminid

        if (adminId != 99999) {

            const admin = await AdminModels.findOne({ where: { id: adminId }, raw: true })

            if (admin.funcao != 'sindico') {
                if (admin.funcao != 'subsindico') {
                    req.flash('mensagem', 'Usuário não possui permissão para Condôminos')
                    res.redirect('/adm/')

                    return
                }
            }           

        }

        const id = req.body.id

        const senha = '654321'
        const salt = bcrypt.genSaltSync(10)
        const hashedsenha = bcrypt.hashSync(senha, salt)

        const user = {
            senha: hashedsenha
        }

        try {
            
            await User.update(user, { where: { id: id } })

            req.flash('mensagem', 'Senha de usuário resetada com sucesso')
            res.redirect('/listar')

        } catch (error) {
            console.log(error)
        }

    }

    static async remove (req, res) {

        const adminId = req.session.adminid

        if (adminId != 99999) {

            const admin = await AdminModels.findOne({ where: { id: adminId }, raw: true })

            if (admin.funcao != 'sindico') {
                if (admin.funcao != 'subsindico') {
                    req.flash('mensagem', 'Usuário não possui permissão para Condôminos')
                    res.redirect('/adm/')

                    return
                }
            }           

        }

        const id = req.body.id

        try {
            
            await Divulgacao.destroy({ where: { UserId: id}})

            await User.destroy({ where: { id: id } })
                        
            req.flash('mensagem', 'Usuário removido com sucesso')
            res.redirect('/listar')

        } catch (error) {
            console.log(error)
        }
    }

    static async alterar (req, res){
        const userid = req.session.userid

        const user = await User.findOne({ where: { id: userid }, raw: true })

        if (!user) {
            req.flash('mensagem', 'Erro de sessão de usuário, gentileza logar novamente')
            res.redirect('/login')

            return
        }

        res.render('autentica/alterar', { user })
    }

    static async alterarPost (req, res){
        const userid = req.session.userid

        const user = await User.findOne({ where: { id: userid }, raw: true })

        if (!user) {
            req.flash('mensagem', 'Erro de sessão de usuário, gentileza logar novamente')
            res.redirect('/login')

            return
        }

        const antigasenha = req.body.antigasenha

        const matchSenha = bcrypt.compareSync(antigasenha, user.senha)

        if (!matchSenha) {
            req.flash('mensagem', 'Senha atual inválida, gentileza tentar novamente')
            res.redirect('/login')

            return
        }

        const senha = req.body.senha

        const confirmsenha = req.body.confirmsenha

        if (senha != confirmsenha) {
            req.flash('mensagem', 'As novas senhas inseridas não conferem')
            res.render('/alterar')

            return
        }
        
        const salt = bcrypt.genSaltSync(10)
        const hashedsenha = bcrypt.hashSync(senha, salt)

        const changeUser = {
            senha: hashedsenha
        }

        try {
            await User.update(changeUser, {where: { id: userid } })

            req.flash('mensagem', 'Senha alterada com sucesso!')
            res.redirect('/')

        } catch (error) {
            console.log(error)
        }
    }

    static async logout (req, res) {

        req.session.destroy()
        res.redirect('/')

    }

    
}