const {Router, request, response} = require('express')
const {Pool} = require('pg')

const vacinasRoutes = new Router()

const conexao = new Pool({
    host: "localhost",
    port: "5432",
    user: "postgres",
    password: "1234",
    database: "pets_bd",
  });


vacinasRoutes.post('/', (request, response) => {

})


vacinasRoutes.get("/", async (request, response) => {
    const vacinados = await conexao.query("SELECT * FROM vacinas");
    response.status(200).json(vacinados.rows);
    //json({vaccadastradas: (await vacinados).rows}) <-- usando objeto
  });
  
  vacinasRoutes.post("/", async (request, response) => {
    try {
      const datavac = request.body;
  
      if (!datavac.nome || !datavac.descricao || !datavac.dose) {
        return response
          .status(400)
          .json({ mensagem: "Os dados são obrigatórios!" });
      }
  
      await conexao.query(
        `
      INSERT INTO vacinas (
      nome,
      descricao,
      dose
      )
      VALUES (
      $1,
      $2,
      $3
      )
      `,
        [datavac.nome, datavac.descricao, datavac.dose]
      );
      /*
  {
  "nome": "Tripla",
  "descricao": "blabla uhuh tatata lololol kakakakaka kekeke",
  "dose": "50mg"
  }
  
  //INSERT MAIS BÁSICO:
  VALUES (
      '${datavac.nome}',
      '${datavac.descricao}',
      '${datavac.dose}'
      )
      `);
  */
      response.status(201).json({ mensagem: "VACINA cadastrada com sucesso!" });
    } catch {
      response
        .status(500)
        .json({ mensagem: "Não rolou de cadastrar a vacina, fera!" });
    }
  });



module.exports = vacinasRoutes