const { Router } = require('express')

//veio do index.js
//const petRoutes = require("./routes/pets.routes"); <---- esse era o caminho antigo!!!!!!!!!!!!!!!
const petRoutes = require("./pets.routes");
const vacinasRoutes = require("./vacinas.routes");
const servicosRoutes = require("./servicos.routes");
const responsaveisRoutes = require('./responsaveis.routes');
const cursosRoutes = require('./cursos.routes');
const usuariosRoutes = require('./usuarios.routes');
const LoginController = require('../controllers/LoginController');
const validaToken = require('../middlewares/validaToken');
const verificarPermissao = require('../middlewares/verificarPermissao');
const permissoesRoutes = require('./permissoes.routes');

const routes = new Router()
//veio do index.js
//antes era app.use

routes.use('/usuarios', usuariosRoutes)
routes.post('/login', LoginController.login)

//routes.use(validaToken) //<-- abaixo apenas rotas privadas
/*routes.use('/servicos', validaToken, servicosRoutes ) //< ou assim em todos!!!!!*/
routes.use('/servicos', servicosRoutes )
routes.use('/pets', petRoutes)
routes.use('/vacinas', vacinasRoutes)

routes.use('/responsaveis', validaToken, responsaveisRoutes)
routes.use('/cursos', validaToken, cursosRoutes)
routes.use('/permissoes', validaToken, permissoesRoutes)



// routes.use('/pedidos', )

module.exports = routes