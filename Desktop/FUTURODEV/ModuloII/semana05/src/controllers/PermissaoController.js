const Permissao = require("../models/Permissao");
const Usuario = require("../models/Usuario");

class PermissaoController {
  async criar(request, response) {
    try {
      const descricao = request.body; //request.body.descricao; <-- assim dava erro ao criar
      //const {descricao} = request.body; <--MESMA COISA

      const permissao = await Permissao.create(descricao);
      response.status(201).json(permissao);
    } catch (error) {
      console.log(error)
      response.status(500).json({ mensagem: "erro ao criar permissão!" });
    }
  }

  async listarTodos(request, response) {
    try {
      const permissoes = await Permissao.findAll();
      
      response.json(permissoes);
    } catch (error) {
      response.status(500).json({ mensagem: "erro ao listar permissões!" });
    }
  }

  async deletar(request, response) {
    try {
      const id = request.params.id;

      const permissao = await Permissao.findByPk(id);

      if (!permissao) {
        return response
          .status(404)
          .json({ mensagem: "permissão não encontrada!" });
      }
      await permissao.destroy();
      response.status(204).json();
    } catch (error) {
      console.log(error)
      response.status(500).json({ mensagem: "erro ao apagar permissão!" });
    }
  }

  async atribuirPermissao(request, response){
try {
  const { usuarioId, permissaoId } = request.body
const usuario = await Usuario.findByPk(usuarioId)
const permissao = await Permissao.findByPk(permissaoId)

if(!usuario || !permissao){
  response.status(404).json({mensagem: 'Usuário ou Permissão não encontrados'})
}

await usuario.addPermissoes(permissao)

response.status(204).json()


} catch (error) {
  console.log(error)
  response.status(500).json({ mensagem: "erro ao atribuir permissão!" });
}
  }
}

module.exports = new PermissaoController()
