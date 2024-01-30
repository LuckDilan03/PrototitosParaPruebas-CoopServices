const jwt = require('jsonwebtoken');

if (process.env.NODE_ENV !== "production") {
    require('dotenv/config');
}

const { KEY } = process.env;

const verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if (!token) {
        return res.status(401).send('No se ha enviado el token de autenticación');
    }

    try {
        const decoded = jwt.verify(token, KEY);
        req.user = decoded;
        return next(); // Agrega esta línea para continuar con la ejecución
    } catch (err) {
        return res.status(401).send('Token inválido');
    }
}

module.exports = verifyToken;
