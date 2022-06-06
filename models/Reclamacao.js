const { DataTypes } = require('sequelize')

const connect = require('../database/connect')
const User = require('./User')

const Reclamacao = connect.define('Reclamacao', {
    tipoReclamacao: {
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
    descricaoOcorrido: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    Verificada: {
        type: DataTypes.BOOLEAN,
        required: true
    },
    solucao: {
        type: DataTypes.STRING,
        required: true
    }
})

Reclamacao.belongsTo(User)
User.hasMany(Reclamacao)

module.exports = Reclamacao