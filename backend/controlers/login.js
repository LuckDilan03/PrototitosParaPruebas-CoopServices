const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/connection');
if(process.env.NODE_ENV !=="production"){
  require('dotenv/config');
}
const {KEY}=process.env;

const login = async (req, res) => {
  try {
    
    const user=req.body.user;
    const contra=req.body.pass;
    if(!user||!contra){
      return res.status(400).send({status:"error",message:"Los Campos estan incompletos"})
    }
    
    // Define la consulta SQL para llamar a la función buscar_usuario con el parámetro Usuario
    const queryText = 'SELECT * FROM buscar_usuario($1)';
    const queryParams = [user];

    // Ejecuta la consulta en la base de datos
    const result = await pool.query(queryText, queryParams);

    if (result.rows.length === 0) {
      return res.status(400).json({ status: 'error', message: 'las credenciales no coinciden o el usuario no existe' });
    }

    const storedPasswordHash = result.rows[0].contrasena;
    const estadoUsuario=result.rows[0].estado
    const passwordsMatch = await bcrypt.compare(contra, storedPasswordHash);

    if (passwordsMatch && estadoUsuario === true ) {
      //información adicional del resultado de la consulta
      const { usuario, dni, rol,estado} = result.rows[0];
      // Genera un token JWT
      const token = jwt.sign({dni,rol,estado, usuario:user }, KEY,{expiresIn: '1h' });
      // Configura la cookie con el token
      res.cookie('authToken', token, { httpOnly: true });
      return res.status(200).send({ status: "ok", message: "Inicio de sesion exitoso" } );
      //enviar el token como respuesta al cliente
    } else {
      // Si las contraseñas no coinciden
      return res.status(400).send({ status: "error", message: "Las credenciales no coinciden o el usuario esta inactivo" } );
    }

    
  } 
  
  catch (error) {
    console.error('Error en la autenticación:', error);
    res.status(400).send({ status: "error", message: "Error al intentar conectar con le servidor" } );
  }
};

module.exports = { login };
