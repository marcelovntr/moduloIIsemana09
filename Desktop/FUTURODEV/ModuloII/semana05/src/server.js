const express = require("express");
// const { Pool } = require("pg");
const routes = require("./routes/routes");
const cors = require("cors");
const connection = require('./database/Database')

// const servicosRoutes = require('./routes/servicos.routes');
// const petRoutes = require("./routes/pets.routes");
// const vacinasRoutes = require("./routes/vacinas.routes");

const APP_PORT = process.env.APP_PORT

class Server {
  constructor(server = express()) { 
    this.middlewares(server);
    this.database();
    server.use(routes); //< era o app.use(routes)
    this.initializeServer(server);
  }

  
  async middlewares(server) {
    server.use(cors()); //quando estiver em produção habiliota o CORS
    server.use(express.json());
  }

  /* Request --> (Rota --> |middlewares| --> Controller --> resposta) --> Response*/

  async database() {
   try {
    console.log("conectando ao banco de dados");
    await connection.authenticate()
   } catch (error) {
    console.log('erro ao conectar ao banco de dados', error)
   }
  
  }

  async initializeServer(server) {
    server.listen(APP_PORT, () => {
      console.log("Servidor rodando na porta 3000");
    });
  }
}

module.exports = { Server };
// const app = express(); <-- o APP "passa a ser" SERVER e vai pra class
// app.use(express.json());

//app.use(routes) <--- vai pra dentro do constructor da classe

// app.use('/servicos', servicosRoutes )
// app.use('/pets', petRoutes)
// app.use('/vacinas', vacinasRoutes)
// app.use('/pedidos', )

// const conexao = new Pool({
//   host: "localhost",
//   port: "5432",
//   user: "postgres",
//   password: "1234",
//   database: "pets_bd",
// });

// //AÇÃO, PATH, IMPLEMENTAÇÃO
// app.get("/bemvindo", (request, response) => {
//   response.send("Bem-vindo!!!");
// });

// app.listen(3000, () => {
//   console.log("Servidor OnLine!");
// });
