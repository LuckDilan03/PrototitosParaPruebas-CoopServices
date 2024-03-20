const pool = require('../config/connection');
const { enviarEmail } = require('../services/email.service');
const { dataUserAprobado, dataUserDenegado } = require('./dataUser');

async function solicitudRegistro(req, res) {
    try {
        const result = await dataUserAprobado(req.params.dni);

        if (!result || result.length === 0 || !result[0]) {
            // Manejar el caso en el que no se encontraron datos para el usuario aprobado
            console.error('No se encontraron datos para el usuario aprobado');
            return res.status(400).json({ status: 'error', message: "No se encontraron datos para el usuario a revisar" });
        }

        if (result[0].respuesta_solicitud && result[0].respuesta_solicitud !== 'EN REVISION') {
            // Manejar el caso en el que la solicitud ya cambió de estado
            console.error('Error al obtener los datos de la solicitud porque cambió de estado, estado actual:', result[0].respuesta_solicitud);
            return res.status(400).json({ status: 'error', message: "La solicitud ya cambió de estado y no se puede modificar" });
        }

        // Si todo está bien, enviar los datos del usuario aprobado como parte del cuerpo de la respuesta
        res.status(200).json(result[0]);
        
    } catch (error) {
        console.error('Error al obtener datos de la solicitud:', error);
        // Si ocurre un error interno del servidor, devolver un error 500
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

module.exports = { solicitudRegistro };
