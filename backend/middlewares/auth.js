const jwt = require('jsonwebtoken');


if (process.env.NODE_ENV !== "production") {
    require('dotenv/config');
}

const { KEY } = process.env;

const verifyToken = (req, res, next) => {
    const token = req.cookies.authToken;

    if (!token) {
        return res.status(401).send('No se ha enviado el token de autenticación');
    }

    try {
        const decoded = jwt.verify(token,KEY);
        req.user = decoded;
        return next(); // Agrega esta línea para continuar con la ejecución
    } catch (err) {
        return res.status(401).send('Token inválido');
    }
}

const verifyRole = (allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.user.rol; // Asegúrate de ajustar el nombre del campo según tu estructura
        if (allowedRoles.includes(userRole)) {
            return next();
        } else {
            return res.status(403).send('No tienes permisos para acceder a esta ruta');
        }
    };
};

module.exports = {
    verifyToken,
    verifyRole
};
