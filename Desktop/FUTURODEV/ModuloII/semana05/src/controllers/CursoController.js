const Curso = require("../models/Curso");

class CursoController {
  async criar(request, response) {
    try {
      console.log("id do usuario:", request.userId); //<-- vem lá VALIDATOKEN
      /*validações!!!*/
      const dados = request.body;
      const curso = await Curso.create(dados);
      response.status(201).json(curso);
    } catch (error) {
      response.status(500).json({ mensagem: "Erro ao cadastrar o curso!" });
    }
  }

  async listarTodos(request, response) {
    try {
      const cursos = await Curso.findAll({
        attributes: [
          ["id", "identificador"], //<-- coluna id AS identificador
          "nome",
          "duracao",
        ],
        order: [["duracao", "DESC"]],
      });
      response.json(cursos);
    } catch (error) {
      response.status(500).json({ mensagem: "Erro ao listar todos cursos!" });
    }
  }

  async listarUm(request, response) {
    try {
      const id = request.params.id;
      const curso = await Curso.findByPk(id);
      if (!curso) {
        return response.status(404).json({ mensagem: "Curso não encontrado!" });
      }
      response.json(curso);
    } catch (error) {
      response.status(500).json({ mensagem: "Erro ao listar os cursos!" });
    }
  }

  async deletarUm(request, response) {
    try {
      const id = request.params.id;
      const curso = await Curso.findByPk(id);
      if (!curso) {
        return response.status(404).json({ mensagem: "Curso não encontrado!" });
      }
      await curso.destroy();
      response.status(204).json();
    } catch (error) {
      response.status(500).json({ mensagem: "Erro ao deletar o curso!" });
    }
  }

  async atualizar(request, response) {
    try {
      const dados = request.body;
      const id = request.params.id;
      const curso = await Curso.findByPk(id);
      if (!curso) {
        return response.status(404).json({ mensagem: "Curso não encontrado!" });
      }

      curso.nome = dados.nome; //<-- se nao vem nada no body: SEQUELIZE interpreta como UNDEFINED e "ignora"
      curso.duracao = dados.duracao;

      await curso.save();
      response.json(curso);
    } catch (error) {
      response.status(500).json({ mensagem: "Erro ao atualizar o curso!" });
    }
  }
}
module.exports = new CursoController();
