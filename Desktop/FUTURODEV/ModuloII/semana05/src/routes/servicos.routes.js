const { Router } = require('express');

const ServicoController = require("../controllers/ServicoController");
const servicosRoutes = new Router();



/*antes era: servicosRoutes.post("/", async (request, response) => { */
servicosRoutes.post("/", ServicoController.criar);
servicosRoutes.get("/", ServicoController.listarTodos)

module.exports = servicosRoutes;
