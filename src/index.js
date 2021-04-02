import Express from 'express'
import usersRoute from '../src/routes/usersRoute';
import { connect } from './services/database';

import {
    verifyToken,
    protectRoute
} from './middlewares/auth'
import { generateToken } from './services/auth'

const app = Express()
const port = 3000

app.set('json spaces', 2);
app.use(Express.json())
app.use(verifyToken)

// registra a rota users com o recurso de autenticação
usersRoute(app);

app.get('/', (req, res) => res.send('Olá mundo pelo Express!'))

app.post('/login', (req, res) => {
    const { username, password } = req.body

    if (username !== 'admin' || password !== '123456') {
        return res.status(400).send({ error: 'Usuário ou senha inválidos!' })
    }

    const payload = {
        sub: 1,
        name: 'Nome Usuário',
        roles: ['admin']
    }
    const token = generateToken(payload)

    res.send({
        token
    })
})

app.get('/protected', protectRoute, /*next*/(req, res) => res.send(req.decoded))

connect()
    .then(() => app.listen(port, () => console.log('Api rodando na porta 3000')))
    .catch(err => console.log(err))