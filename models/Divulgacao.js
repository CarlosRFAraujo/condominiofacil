const { DataTypes } = require('sequelize')

const connect = require('../database/connect')
const User = require('./User')

const Divulgacao = connect.define('Divulgacao', {
    tituloDivulgacao: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    apartamento: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    Descricao: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    valor: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    CPF: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    }
})

Divulgacao.belongsTo(User)
User.hasMany(Divulgacao)

module.exports = Divulgacao