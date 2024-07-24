const { Pool } = require("pg");

const conexao = new Pool({
  host: "localhost",
  port: "5432",
  user: "postgres",
  password: "1234",
  database: "pets_bd",
});

class ServicoController {
  async criar(request, response) {
    try {
      const dados = request.body;

      if (!dados.nome || (!dados.preco && dados.preco !== 0)) {
        return response
          .status(400)
          .json({ mensagem: "Nome e preço são obrigatórios!" });
      }

      const servicoEnviado = await conexao.query(
        `INSERT INTO servicos (nome, descricao, preco)
            VALUES (
            $1,
            $2,
            $3
            )
            returning*
            `,
        [dados.nome, dados.descricao, dados.preco]
      );

      response.status(201).json(servicoEnviado.rows[0]);
    } catch (error) {
      response
        .status(500)
        .json({ mensagem: "Houve um erro inesperado no cadastro!" });
    }
  }

  async listarTodos(request, response) {

const filtros = request.query

if(filtros.filtro){
const servicoFiltrado = await conexao.query(
    `SELECT * FROM servicos
    where nome ilike $1
    or descricao ilike $1`,
    [`%${filtros.filtro}%`]
)
response.json(servicoFiltrado.rows)
}else{
    const servicosSalvos = await conexao.query(
        `SELECT * FROM servicos
        `);
    response.json(servicosSalvos.rows)
}

 
  }

  async atualizar() {}

  async excluir() {}
}
module.exports = new ServicoController(); //<-- evita "instanciar" toda hora (???)
