const jwt = require('jsonwebtoken');
const path = require('path');
const { KEY } = process.env;

if (process.env.NODE_ENV !== "production") {
    require('dotenv/config');
}

const mostrarVista = (req, res, rutaAdmin, rutaUser) => {
    try {
        const token = req.cookies.authToken;
        if (!token) {
            throw new Error('No token provided');
        }

        const decodificado = jwt.decode(token, KEY);

        let filePath;
        switch (decodificado.rol) {
            case 1:
                filePath = `../../frontend/${rutaAdmin}`;
                break;
            case 2:
                filePath = `../../frontend/${rutaUser}`;
                break;
            case 3:
            case 4:
                filePath = '../../frontend/about.html';
                break;
            default:
                throw new Error('Invalid role');
        }

        res.sendFile(path.join(__dirname, filePath));
    } catch (error) {
        console.error('Error:', error.message);
        res.status(401).send('Unauthorized');
    }
};

module.exports = { mostrarVista };
