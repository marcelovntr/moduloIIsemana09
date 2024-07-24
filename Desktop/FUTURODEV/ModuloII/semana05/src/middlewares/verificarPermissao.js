const Usuario = require("../models/Usuario");
const Permissao = require('../models/Permissao')


const verificarPermissao = (permissoesRequeridas) => {//vem do verificarPermissao em cada rota específica!!!
  return async (request, response, next) => { //<-- o middleware (verirficar) é na verdade a callback dentro de verificarPermissão - problemas do JS
    try {
      const { userId } = request;
      const usuario = await Usuario.findByPk(userId, {
        include: {
          model: Permissao,
          through: {
            attributes: [],
          },
        },
      });
      //usuario --> {nome, email, senha, permissoes:[{'permissaoX'}, {'permissaoY'}]}

      const permissoesUsuario = usuario.permissoes.map((p) => p.descricao); //['permissaoX', 'permissaoY']

      const temPermissao = permissoesRequeridas.every((permissao) =>
        permissoesUsuario.includes(permissao)
      );

      if (!temPermissao) {
        return response
          .status(401)
          .json({ mensagem: "Usuário não tem uma ou mais permissões" });
      }

      next();
    } catch (error) {
      response.status(500).json({ mensagem: "A requisição falhou" });
    }
  };
};

module.exports = verificarPermissao;
