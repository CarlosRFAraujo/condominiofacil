const { DataTypes } = require('sequelize')

const connect = require('../database/connect')

const Funcionario = connect.define('Funcionario', {
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    funcao: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    }
})

module.exports = Funcionario