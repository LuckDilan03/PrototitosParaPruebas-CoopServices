const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/connection');
const { KEY } = process.env;

const login = async (req, res) => {
  try {
    console.log(req.body);
    const user = req.body.user;
    const contra = req.body.pass;

    if (!user || !contra) {
      return res.status(400).json({ status: "error", message: "Los campos están incompletos" });
    }

    const queryText = 'SELECT * FROM buscar_usuario($1)';
    const queryParams = [user];
    const result = await pool.query(queryText, queryParams);

    if (result.rows.length === 0) {
      return res.status(400).json({ status: "error", message: "Las credenciales no coinciden o el usuario no existe" });
    }

    const storedPasswordHash = result.rows[0].contrasena;
    const estadoUsuario = result.rows[0].estado;
    const passwordsMatch = await bcrypt.compare(contra, storedPasswordHash);

    if (passwordsMatch || estadoUsuario) {
      const { usuario, dni, rol, estado } = result.rows[0];
      const token = jwt.sign({ dni, rol, estado, usuario: user }, KEY, { expiresIn: '1h' });
      res.cookie('authToken', token, { httpOnly: true });
      return res.status(200).json({ status: "ok", message: "Inicio de sesión exitoso" });
      
    } else {
      return res.status(400).json({ status: "error", message: "Las credenciales no coinciden o el usuario está inactivo" });
    }
  } catch (error) {
    console.error('Error en la autenticación:', error);
    return res.status(500).json({ status: 'error', message: 'Error en la autenticación' });
  }
};

module.exports = { login };
