// const { Pool } = require('pg');

// class Database {
//     constructor() {
//         this.database = new Pool({
//             user: 'postgres',     
//             host: 'localhost',        
//             database: 'pets_bd',  
//             password: '1234',     
//             port: 5432,                
//         });
//     }
// }

// module.exports = Database;

const { Sequelize } = require('sequelize')
const databaseConfig = require('../config/database.config')

const connection = new Sequelize(databaseConfig)


// const connection = new Sequileze(
//     {
//     dialect: 'postgres',
//     host: 'localhost',
//     username: 'postgres',
//     password: '1234',
//     database: 'pets_bd',
//     port: 5432

//     ISSO FOI PARA DATABASECONFIG
// }
// )


module.exports = connection
