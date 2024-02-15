const pool = require('../config/connection');

async function listSolicitudMembresia(req, res) {
    try {
        const evaluador="EN REVISION;"
        const result = await pool.query(`SELECT * FROM tab_solicitarmembresia ;`);
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener datos de la tabla desde la base de datos: ', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

async function aprobarUsuario(req, res) {
    if (!req.body || typeof req.body !== 'object' || !('idSolicitud' in req.body) || !('informacionAdicional' in req.body)) {
        return res.status(400).json({ error: 'El cuerpo de la solicitud no contiene los datos necesarios.' });
    }

    const { idSolicitud, informacionAdicional } = req.body;
    const queryText = `SELECT * FROM aprobarAsociado($1, $2, $3)`;
    const queryParams = [
        idSolicitud,
        informacionAdicional.saldoInicial,
        informacionAdicional.saldoAhorroVoluntario
    ];

    try {
        await pool.query(queryText, queryParams);
        return res.status(200).json({ mensaje: 'Solicitud aprobada correctamente' });
    } catch (error) {
        console.error('Error en la aprobación de solicitud:', error);
        return res.status(500).json({ mensaje: 'Error interno del servidor al aprobar usuario' });
    }
}

module.exports = {
    listSolicitudMembresia,
    aprobarUsuario
};
