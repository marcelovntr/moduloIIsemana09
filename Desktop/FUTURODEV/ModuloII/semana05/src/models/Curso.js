const { DataTypes } = require('sequelize')
const connection = require('../database/Database') 

const Curso = connection.define('cursos',{
    nome: {//allowNull: false,
    type: DataTypes.STRING},
    
    duracao:{
//allowNull: false, <-- assim permite nao mandar valores pelo POSTMAN!!!!!!!!!!!!!!!!!!!!!!!!!!
//do contrário emperra o servidor
type: DataTypes.INTEGER
    }
},
{
    paranoid: true
}


)

module.exports = Curso