const Usuario = require("../models/Usuario")
const {compareSync}=require('bcryptjs')
const {sign}=require('jsonwebtoken')

class LoginController{
async login(request, response){
try {
    const dados = request.body
    if(!dados.email || !dados.password){
        return response.status(400).json({mensagem: "email e senha são necessários"})
    }
const usuario = await Usuario.findOne({where:
    {
        email: dados.email
    }
})
if(!usuario){return response.status(404).json({mensagem: 'conta inexistente!'})}

const senhaOk = compareSync(dados.password, usuario.password_hash)
if(senhaOk === false){
    return response.status(404).json({mensagem: "Conta não encontrada para este email ou senha"})
}

const token = sign(
    //aqui vai o qeu vc quiser armazenar -'PAYLOAD'-
    { id: usuario.id }, //ainda email: usuario.email, nome: usario.nome (...)
process.env.JWT_SECRET,
{ expiresIn: '1d' }
)

//response.json({mensagem: "Login succesful!"})
response.json({
    token: token,
    id: usuario.id,
    nome: usuario.nome
}
)

} catch (error) {
    response.status(500).json({mensagem: "Erro ao realizar login"})
}
}
}

module.exports = new LoginController()