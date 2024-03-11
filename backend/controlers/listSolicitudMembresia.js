const pool = require('../config/connection');
const {enviarEmail}=require('../services/email.service');

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
        enviarEmail("yasstudio69@gmail.com","prueba confirmacion","Su solicitud ah sido aprobada puede ingresar con ");
        return res.status(200).send({ status: "ok", message: "Solicitud aprobada correctamente" } );
    } catch (error) {
        console.error('Error en la aprobación de solicitud:', error);
        return res.status(500).send({ status: "error", message: "Error interno del servidor al aprobar usuario" } );
        
    }
}

async function DenegarSolicitud(req,res){
  if (!req.body || typeof req.body !== 'object' || !('idSolicitud' in req.body) || !('informacionAdicional' in req.body)) {
    return res.status(400).send({ status: "error", message: "El cuerpo de la solicitud no contiene los datos necesarios." } );
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
        enviarEmail("yasstudio69@gmail.com","Denegacion de solicitud de asociado a la cooperativa",informacionAdicional.motivo)
        return res.status(200).send({ status: "ok", message: "Solicitud denegada correctamente" } );
        
    } catch (error) {
        console.error('Error en la denegacion de solicitud:', error);
    return res.status(500).send({ status: "ok", message: "Error interno del servidor al denegar usuario" } );
    
}

}

module.exports = {
  
    listSolicitudMembresia,
    aprobarUsuario,
    DenegarSolicitud
};