const { verify } = require("jsonwebtoken");



function validaToken(request, response, next) {
  try {
    const token = request.headers.authorization; //<-- lá do postman
    console.log(token);
    if (!token) {
      return response.status(400).json({ mensagem: "Token não anexado" });
    }


    //pq do postaman ve: 'Bearer jyajyftftagj...'
const jwtSemBearer = token.split(" ")
//divide o token em um array: ["string1", "string2"]  partir do "espaço"


    //veirify LANÇA UMA EXCEÇÃO!!!, se há erro
    const resultado = verify(jwtSemBearer[1], process.env.JWT_SECRET);
    //verify devolve o conteúdo do token(PAYLOAD), se correto
request.userId = resultado.id //<--- IMPORTANTE!!! nao precisa mais ir ao BANCO pra achar o id
    console.log(resultado)
    next();
  } catch (error) {
                        //"acho" que vem do verify esta mensagem
   if(error.message === "jwt malformed" || error.message === "jwt expired"){
    response.status(400).json({ mensagem: "Token inválido ou expirado!" });
   }
   else{
response.status(500).json({mensagem:"A requisição falhou"})
   }


  }
}

module.exports = validaToken;
