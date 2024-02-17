const bcrypt = require('bcrypt');
const pool = require('../config/connection');

const register = async (req, res) => {
    try {
        console.log(req.body);
        //valida los datos recibidos del front 
        if (!req.body || typeof req.body !== 'object' || !('Documento' in req.body)) 
            {
            res.status(400).json({ status: 'error', message: 'Datos incompletos' });
            }
        
            // extraemos los datos del body del reques para guardarlos en una constante para cada uno 
        const {
            Documento,
            Primer_Nombre,
            Segundo_Nombre,
            Primer_Apellido,
            Segundo_Apellido,
            Direccion,
            Telefono,
            Correo_Electronico,
            Contrasena
        } = req.body;

        const rutaArchivo = req.file.path; // req.file contiene la información del archivo subido por multer

        //validar que todos los datos requeridos por la basedatos esten completos 
        if (!Documento || !Primer_Nombre || !Segundo_Nombre || !Primer_Apellido || !Segundo_Apellido || !Direccion || !Telefono ||!Correo_Electronico ||!Contrasena||!rutaArchivo) 
            {
                res.status(401).send({ status: "error", message:"datos saltantes" } )
            }
        // se encripta la contraseña atravez de la libreria bcript.hash y se guarda en una constante llamada contra_encrip
        const contra_encrip = await bcrypt.hash(Contrasena,10);
        const usuario_document=String(Documento);
        // se crear el query para insertar los datos en la funcion de la base de datos 
        const queryText = `
            SELECT * FROM ingresar_solicitud_asociado ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`;
        
        // se guardan los datos a ingresar a la funcion de la base de datos
        const queryParams = [
        
            Documento,
            Primer_Nombre,
            Segundo_Nombre,
            Primer_Apellido,
            Segundo_Apellido,
            Direccion,
            Telefono,
            Correo_Electronico,
            rutaArchivo,
            usuario_document,
            contra_encrip
        ];
        const result = await pool.query(queryText, queryParams);

        let respuesta;
        let statusCode;
        let statusms;
        

        switch (result.rows[0].ingresar_solicitud_asociado) {
        case '1':
            let numero_solicitud = await buscarNumeroSolicitud(Documento)
            respuesta = `Se ha creado una nueva solicitud con numero ${numero_solicitud}`;
            statusCode = 201;
            statusms='ok';
            break;
        case '2':
            respuesta = 'Ya cuenta con una solicitud aprobada revise el correo registrado.';
            statusCode = 400;
            statusms='error';
            break;
        case '3':
            respuesta = 'Ya cuenta con una solicitud en revisión porfavor espere respuesta al correo registrado.';
            statusCode = 400;
            statusms='error';
            break;
        case '4':
            respuesta = `Ya cuenta con una solicitud denegada por lo que se crea una nueva solicitud con numero ${numero_solicitud}`;
            statusCode = 201;
            statusms=ok;
            break;
        default:
            respuesta = 'Respuesta no reconocida error de validacion en la insercion    ';
            statusCode = 400;
            statusms='error desconocido';
        }
        console.log('Respuesta enviada al cliente:', respuesta)
        res.status(statusCode).send({ status: statusms, message: respuesta } )
        
    } catch (error) {
        console.error('Error en el controlador de registro:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};



async function buscarNumeroSolicitud(documento) {
    try {
      const queryText = `SELECT buscar_solicitud_asociado ($1)`;
      const queryParams = [documento];
      const result = await pool.query(queryText, queryParams);
      // El resultado.rows contendrá la respuesta de la consulta
      // Suponiendo que la consulta devuelve un solo valor, extraemos el primer elemento del arreglo
      const numeroSolicitud = result.rows[0].buscar_solicitud_asociado;
      return numeroSolicitud;
    } catch (error) {
      console.error('Error al buscar número de solicitud:', error);
      throw error; // Importante relanzar el error para que se maneje adecuadamente en la función de registro
    }
  }

module.exports = { register };