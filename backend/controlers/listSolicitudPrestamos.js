const pool = require('../config/connection');

async function listSolicitudPrestamos(req, res) {
    try {
      const result = await pool.query('SELECT * FROM tab_solicitudprestamo');
      res.json(result.rows);
    } catch (error) {
      console.error ('Error al obtener datos de usuarios desde la base de datos: ', error );
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
  
  module.exports = {
    listSolicitudPrestamos
  };
