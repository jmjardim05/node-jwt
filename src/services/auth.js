import jwt from 'jsonwebtoken'

import config from '../config'

const generateToken = (payload) => {
    // jwt.sign() => cria a assinatura do token utilizando uma chave privada de certificado
    return jwt.sign(payload, config.privateKey, config.authOptions)
}

export {
    generateToken,
}