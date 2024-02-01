const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/connection');
if(process.env.NODE_ENV !=="production"){
  require('dotenv/config');
}

const {KEY}=process.env;
const login = async (req, res) => {
  try {
    // Verifica si la solicitud tiene el cuerpo correcto
    if (!req.body || typeof req.body !== 'object' || !('Usuario' in req.body)) {
      return res.status(400).json({ error: 'El cuerpo de la solicitud no contiene los datos necesarios.' });
    }

    // Extrae los valores de Usuario y Clave del cuerpo de la solicitud
    const { Usuario, Clave } = req.body;

    // Verifica que se proporcionen ambos campos
    if (!Usuario || !Clave) {
      return res.status(400).json({ error: 'Debes proporcionar todos los campos requeridos.' });
    }

    // Define la consulta SQL para llamar a la función buscar_usuario con el parámetro Usuario
    const queryText = 'SELECT * FROM buscar_usuario($1)';
    const queryParams = [Usuario];

    // Ejecuta la consulta en la base de datos
    const result = await pool.query(queryText, queryParams);

    // Verifica si la función buscar_usuario indicó que el usuario no está registrado
    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'El usuario no está registrado.' });
    }

    // Compara la contraseña proporcionada con la almacenada en la base de datos usando bcrypt
    const storedPasswordHash = result.rows[0].contrasena;
    const passwordsMatch = await bcrypt.compare(Clave, storedPasswordHash);

    if (passwordsMatch) {
      //información adicional del resultado de la consulta
      const { usuario, dni, rol } = result.rows[0];
      // Genera un token JWT
      const token = jwt.sign({dni,rol, usuario: Usuario }, KEY , { expiresIn: '1h' });
      // Configura la cookie con el token
      res.cookie('authToken', token, { httpOnly: true });
      res.redirect('/dashboard');
      //enviar el token como respuesta al cliente
    } else {
      // Si las contraseñas no coinciden
      return res.status(401).json({ error: 'Credenciales inválidas.' });
    }
  } catch (error) {
    console.error('Error en la autenticación:', error);
    return res.status(500).json({ error: 'Error en la autenticación.' });
  }
};

module.exports = { login };
