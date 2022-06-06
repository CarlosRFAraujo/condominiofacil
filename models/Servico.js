const { DataTypes } = require('sequelize')

const connect = require('../database/connect')
const User = require('./User')

const Servico = connect.define('Servico', {
    servico: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    apartamento: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    observacao: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    Validado: {
        type: DataTypes.BOOLEAN,
        required: true
    },
    executado: {
        type: DataTypes.BOOLEAN,
        required:true
    },
    imagem: {
        type: DataTypes.BLOB,
        required: true
    }
})

Servico.belongsTo(User)
User.hasMany(Servico)

module.exports = Servico