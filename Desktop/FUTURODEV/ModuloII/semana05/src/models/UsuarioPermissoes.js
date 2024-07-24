const { DataTypes } = require("sequelize");
const connection = require("../database/Database");

const UsuarioPermissoes = connection.define('usuario_permissoes',{
    usuarioId:{
        allowNull:false,
        type: DataTypes.INTEGER,
        references:{
            model: 'usuarios',
            key: 'id    '
        }
    },
    permissaoId:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'permissoes',
            key: 'id'
        }
    }
})

module.exports = UsuarioPermissoes