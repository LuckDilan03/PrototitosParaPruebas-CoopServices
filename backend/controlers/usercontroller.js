const jwt = require('jsonwebtoken');
const pool = require('../config/connection');

const obtenerNombrePersona = (req, res) => {
    const token = req.cookies.authToken;

    if (!token) {
        return res.status(401).json({ error: 'Token de autenticación no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.KEY);
        const userId = decoded.id; // Suponiendo que el ID del usuario está almacenado en el token bajo la clave 'id'
        
        obtenerNombrePersona(userId) // Llama a la función que busca el nombre de la persona utilizando el ID del usuario
            .then(nombrePersona => {
                if (nombrePersona) {
                    res.json({ username: nombrePersona });
                } else {
                    res.status(404).json({ error: 'Usuario no encontrado' });
                }
            })
            .catch(error => {
                console.error('Error al obtener el nombre de la persona:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            });
    } catch (err) {
        console.error('Token inválido:', err);
        res.status(401).json({ error: 'Token inválido' });
    }
};

const obtenerNombrePersonaById = async (req, res) => {
    const idPersona = req.params.id;
  
    try {
      const [rows] = await pool.execute(
        'SELECT nombre_persona FROM public.vistaaprobado WHERE dni_persona = ?',
        [idPersona]
      );
  
      if (rows.length > 0) {
        res.json({ nombre: rows[0].nombre_persona });
      } else {
        res.status(404).json({ error: 'Persona no encontrada' });
      }
    } catch (err) {
      console.error('Error al obtener el nombre de la persona:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
  
  module.exports = {
    obtenerNombrePersona,
    obtenerNombrePersonaById
  };