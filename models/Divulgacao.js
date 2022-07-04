const { DataTypes } = require('sequelize')

const connect = require('../database/connect')
const User = require('./User')

const Divulgacao = connect.define('Divulgacao', {
    categoria: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    valor: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    apartamento: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    bloco: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    CPF: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    validado: {
        type: DataTypes.STRING,
        required: true
    }
})

Divulgacao.belongsTo(User)
User.hasMany(Divulgacao)

module.exports = Divulgacao