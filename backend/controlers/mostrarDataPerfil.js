const pool = require('../config/connection');
const jwt = require('jsonwebtoken');
const { KEY } = process.env;

if (process.env.NODE_ENV !== "production") {
    require('dotenv/config');
}

async function dataperfil(req, res) {
    try {
        const token = req.cookies.authToken;
        if (!token) {
            throw new Error('No token provided');
        }

        const decodificado = jwt.decode(token, KEY);
        const dni = decodificado.dni;
        const rol = decodificado.rol;
        const usuario=decodificado.usuario;
        const estado=decodificado.estado;
        const datosUsuario={dni,usuario,estado,rol}

        const { rows: personaRows } = await pool.query('SELECT * FROM obtenerdatospersona($1)', [dni]);
        const datosPersona = personaRows[0];

       

        const datosDashboard = {
            datosUsuario,
            datosPersona,
        };
        
        res.json(datosDashboard);
    } catch (error) {
        console.error('Error al obtener datos de usuarios desde la base de datos: ', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

module.exports = { dataperfil };