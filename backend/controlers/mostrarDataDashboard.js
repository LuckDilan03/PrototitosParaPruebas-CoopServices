const pool = require('../config/connection');
const jwt = require('jsonwebtoken');
const { KEY } = process.env;

if (process.env.NODE_ENV !== "production") {
    require('dotenv/config');
}

async function datadashboard(req, res) {
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
        const datosUsuario={usuario,estado,rol}

        const { rows: personaRows } = await pool.query('SELECT * FROM obtenerdatospersona($1)', [dni]);
        const datosPersona = personaRows[0];

        const { rows: cuentaRows } = await pool.query('SELECT * FROM obtenerdatoscuenta($1,$2)', [dni, rol]);
        const datosCuenta = cuentaRows[0];

        const {rows: aportesRows}=await pool.query('SELECT * FROM obtenerdatosaportescuenta($1,$2)',[dni, rol]);
        const datosaportes=aportesRows
        if (!datosPersona || !datosCuenta || !datosaportes) {
            return res.status(404).json({ error: 'No se encontraron datos para el DNI proporcionado' });
        }

        const datosDashboard = {
            datosUsuario,
            datosPersona,
            datosCuenta,
            datosaportes


        };
        
        res.json(datosDashboard);
    } catch (error) {
        console.error('Error al obtener datos de usuarios desde la base de datos: ', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

module.exports = { datadashboard };
