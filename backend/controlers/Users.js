const bcrypt = require('bcrypt');
const pool = require('../config/connection');
const { Query } = require('pg');

if (process.env.NODE_ENV !== "production") {
    require('dotenv/config');
}

const { ACCESS_TOKEN } = process.env;

const register = async (req, res) => {
    try {
        if (!req.body || typeof req.body !== 'object' || !('Id_Solicitud' in req.body)) {
            return res.status(400).send('El cuerpo de la solicitud no contiene los datos necesarios.');
        }

        const {
            Id_Solicitud,
            DNI_Persona,
            Nombre_Persona,
            Segundo_Nombre_Persona,
            Apellido_Persona,
            Segundo_Apellido_Persona,
            Direccion_Persona,
            Telefono_Persona,
            correo_Persona,
            Documento_Solicitud,
            usuario_deseado,
            Contrasena_deseada
        } = req.body;

        if (!DNI_Persona || !Nombre_Persona || !Apellido_Persona || !Direccion_Persona || !Telefono_Persona || !correo_Persona || !Documento_Solicitud) {
            return res.status(400).send('Debes proporcionar todos los campos requeridos.');
        }

        const contra_encrip = await bcrypt.hash(Contrasena_deseada, 10);

        const selectQuery = new Query("SELECT ingresar_solicitud_asociado($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)", [
            Id_Solicitud,
            DNI_Persona,
            Nombre_Persona,
            Segundo_Nombre_Persona,
            Apellido_Persona,
            Segundo_Apellido_Persona,
            Direccion_Persona,
            Telefono_Persona,
            correo_Persona,
            Documento_Solicitud,
            usuario_deseado,
            contra_encrip
        ]);

        const client = await pool.connect();

        try {
            const result = await client.query(selectQuery);
            console.log('Resultado de la consulta:', result.rows);
            return res.status(200).send('Solicitud ingresada correctamente.');
        } catch (error) {
            console.error('Error al ejecutar la consulta:', error);
            return res.status(500).send('Error interno del servidor.');
        } finally {
            client.release();
        }
    } catch (err) {
        console.error('Error en el controlador de registro:', err);
        return res.status(500).send('Error interno del servidor.');
    }
};

const login = async (req, res) => {
    try {
        const { usuario_ingreso, contrasena_ingreso } = req.body;

        if (!(usuario_ingreso && contrasena_ingreso)) {
            return res.status(400).send('Indica el usuario y contraseña.');
        }

        const client = await pool.connect();

        try {
            // Utilizando una sentencia preparada para evitar inyección SQL
            const loginQuery = 'SELECT * FROM usuarios WHERE usuario = $1';
            const userResult = await client.query(loginQuery, [usuario_ingreso]);

            if (userResult.rows.length === 0) {
                return res.status(401).send('Usuario no encontrado.');
            }

            const hashedPassword = userResult.rows[0].contrasena;
            const passwordMatch = await bcrypt.compare(contrasena_ingreso, hashedPassword);

            if (!passwordMatch) {
                return res.status(401).send('Contraseña incorrecta.');
            }

            return res.status(200).send('Inicio de sesión exitoso.');
        } catch (error) {
            console.error('Error al ejecutar la consulta:', error);
            return res.status(500).send('Error interno del servidor.');
        } finally {
            client.release();
        }
    } catch (err) {
        console.error('Error en el controlador de inicio de sesión:', err);
        return res.status(500).send('Error interno del servidor.');
    }
};


module.exports = { register, login };
