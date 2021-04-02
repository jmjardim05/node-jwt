import jwt from 'jsonwebtoken'
import config from '../config'

const verifyToken = async (req, res, next) => {
    // se não encontrar o token no header Authorization
    // busca o token no body, na querystring ou na custom header 'x-access-token'
    const token = req.headers.authorization && req.headers.authorization.split(" ")[0] === 'Bearer'
        ? req.headers.authorization.split(" ")[1]
        : (req.body.token || req.query.token || req.headers['x-access-token'])

    if (!token) {
        return next() // chama a função definida na rota (GET/POST/PUT/DELETE)
    }

    try {
        // jwt.verify() => verifica a assinatura do token retorna undefined se não está válido
        // a verificação do token é pela chave pública, desta forma o server irá saber aplicar a validação
        const decodedToken = await jwt.verify(token, config.publicKey, config.authOptions)
        req.decoded = decodedToken
        next() // chama a função definida na rota (GET/POST/PUT/DELETE)
    } catch (error) {
        res.status(401).send({
            error: 'Token não informado ou inválido!'
        })
    }
}

const protectRoute = (req, res, next) => {
    if(req.decoded){
       return next() // chama função next definida na rota (index.js)
    }

    // se decoded for undefined significa que a autenticação falhou
    res.status(401).send({
        error: 'Não autorizado!'
    })
}

export {
    verifyToken,
    protectRoute,
}