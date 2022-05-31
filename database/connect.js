const { Sequelize } = require('sequelize')

const connect = new Sequelize('condominio_facil', 'dev', 'dev123456', {
    host: 'localhost',
    dialect: "mysql"
})

try {
    console.log('Conectado ao Banco com sucesso!')
} catch (error) {
    console.log(`Erro na conexão com o banco: ${error}`)
}

module.exports = connect