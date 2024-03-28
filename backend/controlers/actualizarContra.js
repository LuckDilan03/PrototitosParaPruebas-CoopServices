const pool = require('../config/connection');
const bcrypt = require('bcrypt');
const { enviarEmail } = require('../services/email.service');

const actualizarContra = async (req, res) => {
  try {
    const { dni, usuario, password } = req.body;
    const usuarioparam = req.params.usuario;

    if (usuarioparam !== usuario) {
      return res.status(401).send({
        status: "error",
        message: "datos diferentes al proporcionado por el token",
      });
    }

    // Validate the input fields
    if (!dni || !usuario || !password) {
      return res.status(401).send({ status: "error", message: "datos faltantes" });
    }

    // Hash the password
    const encryPassword = await bcrypt.hash(password, 10);

    // Prepare the PostgreSQL query
    const queryText = `SELECT * FROM actuliazarContra($1, $2, $3);`;
    const queryParams = [dni, usuario, encryPassword];

    // Execute the query
    const result = await pool.query(queryText, queryParams);

    // Check if the password was updated
    if (result.rows[0].actuliazarcontra) {
      return res.status(200).send({
        status: "ok",
        message: "Contraseña actualizada correctamente",
      });
    }

    // If the password wasn't updated, return an error
    return res.status(400).send({
      status: "error",
      message: "error al actualizar la contraseña",
    });
  } catch (error) {
    console.error('Error en el controlador de actualizar contra:', error);
    return res.status(500).send({
      error: "Error interno del servidor",
    });
  }
};

module.exports = {
  actualizarContra,
};