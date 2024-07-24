//apenas inicialia o servidos, poucas linhas!
const { Server } = require('./server')

new Server()

/*
const express = require("express");
const { Pool } = require("pg");

const servicosRoutes = require('./routes/servicos.routes');
const petRoutes = require("./routes/pets.routes");
const vacinasRoutes = require("./routes/vacinas.routes");

const app = express();
app.use(express.json());

app.use('/servicos', servicosRoutes )
app.use('/pets', petRoutes)
app.use('/vacinas', vacinasRoutes)
app.use('/pedidos', )

const conexao = new Pool({
  host: "localhost",
  port: "5432",
  user: "postgres",
  password: "1234",
  database: "pets_bd",
});

//AÇÃO, PATH, IMPLEMENTAÇÃO
app.get("/bemvindo", (request, response) => {
  response.send("Bem-vindo!!!");
});


app.listen(3000, () => {
  console.log("Servidor OnLine!");
});
*/
