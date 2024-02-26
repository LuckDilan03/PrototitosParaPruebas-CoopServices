const pool = require('../config/connection');
const pool = require('../config/connection');

async function obtenerDatosCuenta(req, res) {
  try {
    const { DNI_Persona } = req.params; // Suponiendo que pasas el DNI de la persona como parámetro en la URL
    
    // Consulta para obtener los datos personales de la persona
    const queryDatosPersonales = `
      SELECT 
        Nombre_Persona AS nombre,
        Direccion_Persona AS direccion,
        Telefono_Persona AS telefono
      FROM 
        tab_Persona
      WHERE 
        DNI_Persona = $1
    `;
    const resultDatosPersonales = await pool.query(queryDatosPersonales, [DNI_Persona]);

    // Consulta para obtener los datos de la cuenta de la persona
    const queryDatosCuenta = `
      SELECT 
        Saldo_Cuenta AS saldo
      FROM 
        tab_Cuenta
      WHERE 
        DNI_Asociado = $1
    `;
    const resultDatosCuenta = await pool.query(queryDatosCuenta, [DNI_Persona]);
    
    // Verificar si se encontraron datos personales y de cuenta
    if (resultDatosPersonales.rows.length === 0 || resultDatosCuenta.rows.length === 0) {
      return res.status(404).json({ error: 'No se encontraron datos de la cuenta para la persona' });
    }

    // Si se encontraron datos, enviar la respuesta
    const datosCuenta = {
      nombre: resultDatosPersonales.rows[0].nombre,
      direccion: resultDatosPersonales.rows[0].direccion,
      telefono: resultDatosPersonales.rows[0].telefono,
      saldo: resultDatosCuenta.rows[0].saldo
    };

    res.json(datosCuenta);
  } catch (error) {
    console.error('Error al obtener datos de la cuenta desde la base de datos: ', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

module.exports = {
  obtenerDatosCuenta
};
