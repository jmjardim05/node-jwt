import logonUser from "../controllers/usersController";
import { generateToken } from '../services/auth'

const usersRoute = app => {
    app.route("/users/auth")
        .post(logonUser, (req, res) => {
            if (req.logon) {
                const payload = {
                    sub: req.userId,
                    name: req.body.userName,
                    roles: ['admin']
                }
                const token = generateToken(payload)
            
                res.send({
                    token
                }) 
            }
        })
}

export default usersRoute;