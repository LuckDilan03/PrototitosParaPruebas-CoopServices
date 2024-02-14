const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/connection');
require('dotenv/config');

const { KEY } = process.env;

const login = async (req, res) => {
  try {
    const { Usuario, Clave } = req.body;

    // Verifica si se proporcionan los campos de usuario y contraseña
    if (!Usuario || !Clave) {
      return res.status(400).json({ error: 'Debes proporcionar todos los campos requeridos.' });
    }

    const queryText = 'SELECT contrasena_ingreso FROM tab_usuarios WHERE usuario_ingreso = $1';
    const queryParams = [Usuario];

    const result = await pool.query(queryText, queryParams);

    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'El usuario no está registrado.' });
    }

    const storedPasswordHash = result.rows[0].contrasena_ingreso;

    // Verifica si la contraseña almacenada es un hash válido
    if (!storedPasswordHash) {
      return res.status(500).json({ error: 'La contraseña almacenada no es válida.' });
    }

    const passwordsMatch = await bcrypt.compare(Clave, storedPasswordHash);

    if (passwordsMatch) {
      const token = jwt.sign({ Usuario }, KEY, { expiresIn: '1h' });
      res.cookie('authToken', token, { httpOnly: true });
      res.redirect('/admin');
    } else {
      return res.status(401).json({ error: 'Credenciales inválidas.' });
    }
  } catch (error) {
    console.error('Error en la autenticación:', error);
    return res.status(500).json({ error: 'Error en la autenticación.' });
  }
};

module.exports = { login };
