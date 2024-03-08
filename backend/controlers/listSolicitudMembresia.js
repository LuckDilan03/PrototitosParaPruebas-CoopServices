const pool = require('../config/connection');

async function listSolicitudMembresia(req, res) {
  try {
    const result = await pool.query('SELECT * FROM tab_solicitarmembresia');
    res.json(result.rows);
  } catch (error) {
    console.error ('Error al obtener datos de la tabla desde la base de datos: ', error );
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

async function aprobarUsuario(req, res) {
    if (!req.body || typeof req.body !== 'object' || !('idSolicitud' in req.body) || !('informacionAdicional' in req.body)) {
        return res.status(400).send({ status: "error", message: "El cuerpo de la solicitud no contiene los datos necesarios." });
        return res.status(400).json({ error: 'El cuerpo de la solicitud no contiene los datos necesarios.' });
    }

    const { idSolicitud, informacionAdicional } = req.body;
    const queryText = `SELECT * FROM aprobarAsociado($1, $2, $3,$4)`;
    const queryParams = [
        idSolicitud,
        informacionAdicional.saldoInicial,
        informacionAdicional.saldoAhorroVoluntario,
        informacionAdicional.numeroResolucion
    ];

    try {
        await pool.query(queryText, queryParams);
        return res.status(200).send({ status: "ok", message: "Solicitud aprobada correctamente" } );
        return res.status(200).json({ mensaje: 'Solicitud aprobada correctamente' });
    } catch (error) {
        console.error('Error en la aprobación de solicitud:', error);
        return res.status(500).send({ status: "error", message: "Error interno del servidor al aprobar usuario" } );
        return res.status(500).json({ mensaje: 'Error interno del servidor al aprobar usuario' });
    }
}

async function DenegarSolicitud(req,res){
  if (!req.body || typeof req.body !== 'object' || !('idSolicitud' in req.body) || !('informacionAdicional' in req.body)) {
    return res.status(400).send({ status: "error", message: "El cuerpo de la solicitud no contiene los datos necesarios." } );
    return res.status(400).json({ error: 'El cuerpo de la solicitud no contiene los datos necesarios.' });
}

const { idSolicitud, informacionAdicional } = req.body;
const queryText = `SELECT * FROM denegarSolicitud($1, $2,$3)`;
const queryParams = [
    idSolicitud,
    informacionAdicional.motivo,
    informacionAdicional.numeroResolucion
];

try {
    await pool.query(queryText, queryParams);
    return res.status(200).send({ status: "ok", message: "Solicitud denegada correctamente" } );
    return res.status(200).json({ mensaje: 'Solicitud aprobada correctamente' });
} catch (error) {
    console.error('Error en la aprobación de solicitud:', error);
    return res.status(500).send({ status: "ok", message: "Error interno del servidor al denegar usuario" } );
    return res.status(500).json({ mensaje: 'Error interno del servidor al aprobar usuario' });
}

}

module.exports = {
  
    listSolicitudMembresia,
    aprobarUsuario,
    DenegarSolicitud
};