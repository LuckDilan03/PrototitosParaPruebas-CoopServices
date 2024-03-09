const jwt = require('jsonwebtoken');

if (process.env.NODE_ENV !== "production") {
    require('dotenv/config');
}

const { KEY } = process.env;

const path = require('path');

const validarRol = (req, res, next) => {
    const token = req.cookies.authToken;
    if (!token) {
        console.log('No se ha enviado el token de autenticación');
        return res.redirect('/dashboard');
    }
    
    try {
        const decodificado = jwt.verify(token, KEY);
        if (decodificado.rol === 1) {
            next(); // Permitir el acceso al siguiente middleware
        } else {
            console.log('Token invalido');
            return res.redirect('/dashboard');;
        }
    } catch (error) {
        return res.status(401).json({ message: "Token de autenticación inválido" });
    }
};

module.exports = validarRol;