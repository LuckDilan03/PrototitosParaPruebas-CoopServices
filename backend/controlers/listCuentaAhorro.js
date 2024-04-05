const pool = require('../config/connection');

async function listCuentaAhorro(req, res) {
  try {
    const result = await pool.query('SELECT * FROM tab_cuenta'); // hacer una vista para mostrar los datos de la tabla cuenta y no llamar directamente a la tabla :)
    res.json(result.rows);
  } catch (error) {
    console.error ('Error al obtener datos de usuarios desde la base de datos: ', error );
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

module.exports = {
    listCuentaAhorro
};