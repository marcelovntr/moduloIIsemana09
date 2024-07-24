const { Router } = require('express');
const Responsavel = require('../models/Responsavel');

const responsaveisRoutes = new Router()


responsaveisRoutes.post('/', async (request, response)=>{
    try {
        const dados = request.body
        const responsavel = await Responsavel.create({
        nome: dados.nome,
        idade: dados.idade,
        email: dados.email,
        senha: dados.senha,
        sexo: dados.sexo
       
        //DO PROFESSOR!!!!!!!!!!!
        // const {nome, idade, email, senha, sexo} = request.body
        // const responsavel = await Responsavel.create({
        // nome,
        // idade,
        // email,
        // senha,
        // sexo
        })
        response.json(responsavel)
    } catch (error) {
        response.status(500).json({mensagem: 'não foi possível cadastrar o responsável!'})
    }

})

responsaveisRoutes.get('/', async (request,response)=>{
//const dados = request.query
const responsaveis = await Responsavel.findAll()
response.json(responsaveis)
})

responsaveisRoutes.get('/:id', async(request, response)=>{
    const responsavelId = request.params.id
    const responsavel = await Responsavel.findByPk(responsavelId)

    //const responsavel = await Responsavel.find({nome: 'xyz'})
    //todos
    //const responsavel = await Responsavel.findOne({nome: 'xyz'})
    //só o primeiro
    if(!responsavel){
        return response.status(404).json({mensagem: 'responsável não encontrado'})
    }
    response.json(responsavel)
})

responsaveisRoutes.put('/:id', async (request, response) =>{
const responsavelId = request.params.id

const responsavel = await Responsavel.findByPk(responsavelId)

if(!responsavel){
    return response.status(404).json({mensagem: 'responsável não encontrado'})
}
const responsavelEnviado = request.body

responsavel.nome = responsavelEnviado.nome,
responsavel.idade = responsavelEnviado.idade,
responsavel.sexo = responsavelEnviado.sexo,
responsavel.email = responsavelEnviado.email,
responsavel.senha = responsavelEnviado.senha

//do professor:
 /*const {nome, idade, sexo, email, senha} = request.body
 responsavel.nome = nome,
 responsavel.idade = idade,
 responsavel.sexo =  sexo,
 responsavel.email =  email,
 responsavel.senha = senha
*/

await responsavel.save()
return response.json(responsavel)
})

responsaveisRoutes.delete('/:id', async (request, response) =>{
    const responsavelId = request.params.id
    
    const responsavel = await Responsavel.findByPk(responsavelId)
    
    if(!responsavel){
        return response.status(404).json({mensagem: 'responsável não encontrado'})
    }

await responsavel.destroy() //<-- apenas preenche o deletedAt
//questão da deleção apenas lógica do banco de dados real
return response.status(204).send()
})
module.exports = responsaveisRoutes