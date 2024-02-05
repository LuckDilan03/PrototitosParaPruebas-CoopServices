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

module.exports = {
  listSolicitudMembresia
};