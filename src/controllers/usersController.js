import UserModel from "../models/users";

const logonUser = (req, res, next) => {
    const { userName, password } = req.body;

    if (!userName || !password) {
        return res.status(400).send({
            erro: "usuário ou senha não informados"
        });
    }

    try {
        UserModel.findOne(req.body, function(err, user) {
            if (err) {
                return res.status(400).send(err);
            }
            
            if (!user) {
                return res.status(400).send({
                    erro: "usuário/senha inválidos"
                });
            }            

            req.userId = user._id;
            req.logon = true;
            next();
        });
    } catch (err) {
        res.status(400).send(err);
    }    
}

export default logonUser;