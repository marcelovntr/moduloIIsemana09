const {Router} = require('express')
const {Pool} = require('pg')

const petRoutes = new Router()

const conexao = new Pool({
    host: "localhost",
    port: "5432",
    user: "postgres",
    password: "1234",
    database: "pets_bd",
  });

petRoutes.post('/pets', (request, response)=>{

})

/*CRUD PETS */

petRoutes.get("/", async (request, response) => {
  const dadinhos = request.query; //<--- requests ESPECÍFICO pelo HTTP!!!

  if (dadinhos.nome) {
    //este if não recebe o return pq encerraria na primeira query
    const petes = await conexao.query("SELECT * FROM pets where nome=$1", [
      dadinhos.nome,
    ]);
    //  ('SELECT * FROM pets where nome ilike $1', [`%${dadinhos.nome}%`]) <---REVER ISSO!!! maior abrangência de busca
    response.status(200).json(petes.rows); //<--- !!!!!!!!!!!!!!!! diferente p/ retornar uma array
  } else {
    const petes = await conexao.query("SELECT * FROM pets"); //<-- ARMAZENA na const neste caso, pq ñ tá só fazendo a query
    response.status(200).json(petes.rows);
  }
});

petRoutes.post("/", async (request, response) => {
  //TRY N' CATCH: "última" coisa passada!!!
  try {
    const dados = request.body; //<---- CORPO DO POSTMAN!!!

    if (!dados.nome || !dados.tipo || !dados.idade || !dados.raca) {
      return response.send("Nome, tipo, raça e idade são obrigatórios!");
      //return pra encerrar sem sequer executar a query
    }

    await conexao.query(
      `
      INSERT INTO pets(
      nome,
      tipo,
      responsavel,
      raca,
      idade
      )
      VALUES (
      $1,
      $2,
      $3,
      $4,
      $5
      )
      `,
      [dados.nome, dados.tipo, dados.responsavel, dados.raca, dados.idade]
    );
    response.status(201).json({ mensagem: "PET cadastrado com sucesso" });
    //.send("PET cadastrado com sucesso!"); <--1ª versão!!!

    /**FORMA INICIAL PASSADA:
     *  VALUES (
      '${dados.nome}',
      '${dados.tipo}',
      '${dados.responsavel}',
      '${dados.raca}',
      '${dados.idade}'
      )
      `,);
     */

    /*
    conteúdo enviado pelo POSTMAN:
    {
      "nome": "Totozinho",
      "idade": "14",
      "responsavel": "Douglas",
      "raca": "caramelo",
      "tipo": "cachorro"
  }
     */
  } catch {
    response
      .status(500)
      .json({ mensagem: "Não foi possível cadastrar o animal" });
    //erro no servidor
  }
});

petRoutes.delete("/:id", async (request, response) => {
  const id = request.params.id;
  //const {id} = request.params <--- forma DESESTRUTURADA

  await conexao.query("DELETE FROM pets where id = $1", [id]);
  response.status(204).json(); //<-- sucesso "sem resposta"
});


module.exports = petRoutes