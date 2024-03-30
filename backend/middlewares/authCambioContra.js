const jwt = require('jsonwebtoken');


if (process.env.NODE_ENV !== "production") {
    require('dotenv/config');
}

const { KEY } = process.env;

const verifyToken = (req, res, next) => {
    const token = req.params.token;

    if (!token) {
        console.log('No se ha enviado el token de autenticación');
        return res.redirect('/');
    }

    try {
        const decoded = jwt.verify(token,KEY);
        req.user = decoded;
        return next(); // Agrega esta línea para continuar con la ejecución
    } catch (err) {
        console.log('Token invalido');
        return res.redirect('/');
    }
}

module.exports={verifyToken}