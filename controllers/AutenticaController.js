const bcrypt = require('bcryptjs')

const User = require('../models/User')
const validaCpf = require('../helpers/cpf')


module.exports = class Autentica {
    static async login (req, res) {
        res.render('autentica/autenticar')
    }

    static async registrar (req, res) {
        res.render('autentica/registrar')
    }

    static async registrarPost (req, res) {
        const {cpf, nome, apartamento, bloco, senha, confirmsenha} = req.body

        const checaCPF = await validaCpf(cpf)

        if (!checaCPF) {
            req.flash('mensagem', 'Número de CPF inválido, gentileza conferir e digitar novamente')
            res.render('autentica/registrar')

            return
        }

        const checkUserExists = await User.findOne({ where: { cpf: cpf }})

        if (checkUserExists) {
            req.flash('mensagem', 'CPF já existe no sistema, caso tenha esquecido a senha, solicitar reset')
            res.render('autentica/registrar')

            return
        }

        const checkApto = await User.findOne({ where: { apartamento: apartamento }, subQuery: { bloco: bloco } })

        if (checkApto) {
            req.flash('mensagem', 'Apartamento já possui usuário cadastrado, para alteração do titular procurar o síndico')
            res.render('autentica/registrar')

            return
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
            senha: hashedsenha
        }

        try {
            const criaUser = await User.create(user)

            req.flash('mensagem', 'Cadastro realizado com sucesso! gentileza aguardar validação pela Administração do condomínio')

            res.redirect('/')

        } catch (error) {
            console.log(error)
        }

    }

    static async logout (req, res) {

    }

    
}