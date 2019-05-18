const User = require('../models/User');

const authenticate = (req,res,next )=> {
    const token =req.header('auth-token');
    User.findByToken(token)
    .then(user=>{
        if(!user){
            return Promise.reject();
        }else {
            req.token = token;
            req.user = user;
            next();
        }
    })
    .catch((e)=>{
        return res.status(401).send({
            err:"Authentication Failed"
        });
    });
}

module.exports={
    authenticate,
}