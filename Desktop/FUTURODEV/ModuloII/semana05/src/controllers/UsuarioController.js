const Usuario = require("../models/Usuario");
const padraoEmail = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

class UsuarioController {
  async criarConta(request, response) {
    try {
      const dados = request.body;
      if (!dados.nome) {
        return response.status(400).json({ mensagem: "o nome é obrigatório!" });
      }

      if (padraoEmail.test(dados.email === false)) {
        return response
          .status(400)
          .json({ mensagem: "formato de email inválido!" });
      }

      //dados.password && dados.password.length <-- !!!
      if (!(dados.password?.length >= 8 && dados.password.length <= 16)) {
        return response
          .status(404)
          .json({ mensagem: "a senha deve conter entre 8 e 16 caracteres!" });
      }

      const usuarioExistente = await Usuario.findOne({
        where: {
            email: dados.email
        }
      })

      if(usuarioExistente){
        return response.status(400).json({mensagem: "conta já existente!"})
      }
      const usuario = await Usuario.create({
        nome: dados.nome,
        email: dados.email,
        password_hash: dados.password,
      });

      //response.json({ mensagem: `sucesso! o usuário: ${usuario.nome} foi criado`});
      //response.status(201).json(usuario) <-- assim não é seguro!!!!
      response.status(201).json({
        nome: usuario.nome,
        email: usuario.email,
        createdAt: usuario.createdAt
      })
    } catch (error) {
      response
        .status(500)
        .json({ mensagem: "Não foi possível cadastrar cliente!" });
    }
  }
}

module.exports = new UsuarioController();
