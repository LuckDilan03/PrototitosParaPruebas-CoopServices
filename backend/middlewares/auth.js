const jwt = require('jsonwebtoken');
if (process.env.NODE_ENV !== "Production"){
    require('dotenv/config');
}
const {KEY} = process.env;

const verifyToken = (req,res,next)=>{
    const token = req.headers["x-access-token"];

    if (!token){

        return res.status(404).send('no se ah enviado el token de autentificacion');
    }
    try{
        const decoded =jwt.verify(token,KEY);
        req.user=decoded;
    }
    catch(err){
        return res.status(404).send('token invalido');
    }
    return next;
}
module.exports = verifyToken;
