const bcrypt = require('bcrypt');
const pool = require('../config/connection');
//funcion que se encarga de registrar los datos del usuario
const register = async (req, res) => {
  try {
    //valida los datos recibidos del front 
    if (!req.body || typeof req.body !== 'object' || !('DNI_Persona' in req.body)) {
      return res.status(400).json({ error: 'El cuerpo de la solicitud no contiene los datos necesarios.' });
    }
    // extraemos los datos del body del reques para guardarlos en una constante para cada uno 
    const {
      DNI_Persona,
      Nombre_Persona,
      Segundo_Nombre_Persona,
      Apellido_Persona,
      Segundo_Apellido_Persona,
      Direccion_Persona,
      Telefono_Persona,
      correo_Persona,
      Documento_Solicitud,
      usuario_deseado,
      Contrasena_deseada
    } = req.body;
    //validar que todos los datos requeridos por la basedatos esten completos 
    if (!DNI_Persona || !Nombre_Persona || !Apellido_Persona || !Direccion_Persona || !Telefono_Persona || !correo_Persona || !Documento_Solicitud) {
      return res.status(400).json({ error: 'Debes proporcionar todos los campos requeridos.' });
    }
    // se encipta la contraseña atravez de la libreria bcript.hash y se guarda en una constante llamada contra_encrip
    const contra_encrip = await bcrypt.hash(Contrasena_deseada, 10);
    // se crear el query para insertar los datos en la funcion de la base de datos 
    const queryText = `
      SELECT * FROM ingresar_solicitud_asociado(
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
      )`;
    // se guardan los datos a ingresar a la funcion de la base de datos
    const queryParams = [
      
      DNI_Persona,
      Nombre_Persona,
      Segundo_Nombre_Persona,
      Apellido_Persona,
      Segundo_Apellido_Persona,
      Direccion_Persona,
      Telefono_Persona,
      correo_Persona,
      Documento_Solicitud,
      usuario_deseado,
      contra_encrip
    ];
    
    const result = await pool.query(queryText, queryParams);

    let respuesta;
    let statusCode;

    switch (result.rows[0].ingresar_solicitud_asociado) {
      case '1':
        respuesta = 'Se ha insertado una nueva solicitud.';
        statusCode = 200;
        break;
      case '2':
        respuesta = 'Ya cuenta con una solicitud aprobada.';
        statusCode = 400;
        break;
      case '3':
        respuesta = 'Ya cuenta con una solicitud en revisión.';
        statusCode = 400;
        break;
      case '4':
        respuesta = 'Ya cuenta con una solicitud denegada.';
        statusCode = 200;
        break;
      default:
        respuesta = 'Respuesta no reconocida.';
        statusCode = 400;
    }

    console.log('Respuesta enviada al cliente:', respuesta);
    res.status(statusCode).json({ respuesta });
  } catch (error) {
    console.error('Error en el controlador de registro:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};



module.exports = { register };
