const { Sequelize } = require('sequelize')

const connect = new Sequelize('condominio_facil', 'dev', 'Vix0428wal', {
    host: 'dbcondfacil.cxmmg4az2zjb.us-east-1.rds.amazonaws.com',
    dialect: "mysql"
})

try {
    console.log('Conectado ao Banco com sucesso!')
} catch (error) {
    console.log(`Erro na conexão com o banco: ${error}`)
}

module.exports = connect