const { DataTypes } = require("sequelize");
//const { connection } = require("../database/Database"); <-- está assim no arquivo do prof e nao funcionou, DESESTRUTURANDO
const connection = require("../database/Database");
const Responsavel = connection.define("responsaveis", {
  nome: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  idade: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  sexo: {
    allowNull: false,
    type: DataTypes.ENUM("Masculino", "Feminino", "Outro"),
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  senha: { allowNull: false, type: DataTypes.STRING },
},{
  paranoid: true
}
);

module.exports = Responsavel;
