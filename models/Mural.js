const { DataTypes } = require('sequelize')

const connect = require('../database/connect')
const Admin = require('./Admin')

const Mural = connect.define('Mural', {
    Titulo: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    Texto: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    }
})

Mural.belongsTo(Admin)
Mural.hasMany(Mural)

module.exports = Mural