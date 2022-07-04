const { DataTypes } = require('sequelize')

const connect = require('../database/connect')
const Admin = require('./Admin')

const User = connect.define('User', {
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
    apartamento: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    bloco:{
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },    
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    proprietario: {
        type: DataTypes.STRING,
        required: true
    },
    cpfValidador: {
        type: DataTypes.STRING,
        required: true
    }
})

User.belongsTo(Admin)
Admin.hasMany(User)

module.exports = User