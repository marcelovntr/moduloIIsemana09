const { Router } = require('express')
const CursoController = require('../controllers/CursoController')
const validaToken = require('../middlewares/validaToken')
const verificarPermissao = require('../middlewares/verificarPermissao')

const cursosRoutes = new Router()

cursosRoutes.post('/', verificarPermissao(['criarCursos']), CursoController.criar)
//cursosRoutes.get('/servicos', verificarPermissao(['criar'], ['listarUm']), servicosRoutes )
cursosRoutes.get('/', verificarPermissao(['listarCursos']),CursoController.listarTodos)
cursosRoutes.get('/:id', CursoController.listarUm)
cursosRoutes.delete('/:id', CursoController.deletarUm)
cursosRoutes.put('/:id', CursoController.atualizar)

module.exports = cursosRoutes