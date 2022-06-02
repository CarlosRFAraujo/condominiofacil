const { DataTypes } = require('sequelize')

const connect = require('../database/connect')
const User = require('./User')

const Sugestao = connect.define('Sugestao', {
    sugestao: {
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
})

Sugestao.belongsTo(User)
User.hasMany(Sugestao)

module.exports = Sugestao