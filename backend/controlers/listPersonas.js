const pool = require('../config/connection');

async function listPersonas(req, res) {
  try {
    const result = await pool.query('SELECT * FROM vista_personas');
    res.json(result.rows);
  } catch (error) {
    console.error ('Error al obtener datos de usuarios desde la base de datos: ', error );
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

module.exports = {
  listPersonas
};