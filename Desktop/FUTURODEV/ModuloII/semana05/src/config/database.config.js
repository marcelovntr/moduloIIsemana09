const { config } = require('dotenv')
config() // <-- todas variáveis de config achamos dentro do --> .env
//como está importado aqui... acaba sendo transmitido aos demais arquivos
//sem necessidade de chamar em outros arquivos  

const DATABASE = "pets_bd"

module.exports = {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
}


// module.exports = {
//     dialect: 'postgres',
//     host: 'localhost',
//     username: 'postgres',
//     password: '1234',
//     database: 'DATABASE',
//     port: 5432,
// }