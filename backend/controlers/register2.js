const bcrypt = require('bcrypt');
const pool = require('../config/connection');
const {enviarEmail}=require('../services/email.service')

const register = async (req, res) => {
    try {
        
        //valida los datos recibidos del front 
        if (!req.body || typeof req.body !== 'object' || !('Documento' in req.body)) 
            {
            return res.status(400).json({ status: 'error', message: 'Datos incompletos' });
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

        const rutaArchivo = req.file.filename; // req.file contiene la información del archivo subido por multer

        //validar que todos los datos requeridos por la basedatos esten completos 
        if (!Documento || !Primer_Nombre  || !Primer_Apellido  || !Direccion || !Telefono ||!Correo_Electronico ||!Contrasena||!rutaArchivo) 
            {
               return res.status(401).send({ status: "error", message:"datos faltantes" } )
            }
        // se encripta la contraseña atravez de la libreria bcript.hash y se guarda en una constante llamada contra_encrip
        const contra_encrip = await bcrypt.hash(Contrasena,10);
        const usuario_document=`AS${String(Documento)}`;
        // se crear el query para insertar los datos en la funcion de la base de datos 
        const queryText = `
            SELECT * FROM ingresar_solicitud_asociado ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`;
        // se guardan los datos a ingresar a la funcion de la base de datos
        const queryParams = [
        
            Documento,
            Primer_Nombre,
            Primer_Apellido,
            Direccion,
            Telefono,
            Correo_Electronico,
            rutaArchivo,
            usuario_document,
            contra_encrip,
            Segundo_Nombre,
            Segundo_Apellido,
        ];

        const result = await pool.query(queryText, queryParams);

        let respuesta;
        let statusCode;
        let statusms;
        let mensajeCorreo;
        let asunto;
        let tituloMensaje;
        
        

        

        switch (result.rows[0].ingresar_solicitud_asociado) {
        case '1':
            let numero_solicitud = await buscarNumeroSolicitud(Documento)
            respuesta = `
            Se Ah Creado Una Nueva Solicitud 
            Numero De Solicitud: ${numero_solicitud}`;
            tituloMensaje='Registro Exitoso';
            asunto='Registro Exitoso De Solicitud Asociacion CoopServices'
            mensajeCorreo=`Felicidades su solicitud de registro ah sido recibida con exito y se encuentra registrada con el numero: ${numero_solicitud}`
            statusCode = 201;
            statusms='ok';
            break;
        case '2':
            let numero_solicitudAprobada = await buscarNumeroSolicitud(Documento)
            respuesta = 
            `
            ¿ Intenta volver a registrarse ? 
            ¡ Ya Esta Aprobado Felicidades !
            Numero De Solicitud: ${numero_solicitudAprobada}
            Verifique Su Correo Electronico  
            Comunicate Con El Admin O Restablece Tu Contraseña `;
            statusCode = 400;
            tituloMensaje='Confirmacion De Usuario';
            asunto='¿ Intenta volver a registrarse ?  Coopservices Correo Confirmacion Cuenta Aprobada'
            mensajeCorreo=` 
            ¿ Intenta Volver A Registrarse ? 
            ¡ Ya Esta Aprobado Felicidades !
            Usuario Ingreso :${usuario_document}
            `
            statusms='error';
            break;
        case '3':
            let numero_solicitudRevision = await buscarNumeroSolicitud(Documento)
            respuesta = `
            Ya Cuenta Con Una Solicitud En Revisión  
            Numero De Solicitud :${numero_solicitudRevision} 
            Porfavor Espere Respuesta Al Correo Registrado.`;
            statusCode = 400;
            tituloMensaje='Paciencia Por Favor Pronto Recibiras Una Respuesta ';
            asunto='Pronto recibiras una respuesta Espera De Respuesta No Mayor A 15 Dias';
            mensajeCorreo=`
             No Es Posible Registrarse Nuevamente 
             Porfavor Espere Una Respuesta De La Solicitud Con Numero ${numero_solicitudRevision}`
            statusms='error';
            break;
        case '4':
            let numero_solicitud_denegada = await buscarNumeroSolicitud(Documento)
            respuesta =`
            Se Registro Una Nueva Solicitud De Registro 
            Numero Nueva Solicitud De Registro: ${numero_solicitud_denegada}
            Porfavor Solicionar Los Motivos De Rechazo De la Solicitud Anterior 
            Numero Solicitud Denegada :  `;
            tituloMensaje='Nuevo Registro Asociado coopservices ';
            asunto='Nueva Solicitud De Registro Despues De Ser Rechazado Previamente ';
            mensajeCorreo=`
             Se Registro Una Nueva Solicitud De Registro 
             Numero Nueva Solicitud De Registro: ${numero_solicitud_denegada}
             Porfavor Solicionar Los Motivos De Rechazo De la Solicitud Anterior 
             Numero Solicitud Denegada :  `;
            statusCode = 201;
            statusms='ok';
            break;
        
        case '5':
            respuesta = `
            El Usuario Ya Se Encuentra Registrado 
            Comuniquese Con El Admin 
            Debido A Discrepancias En Los Datos De Registro`;
            statusCode = 400;
            statusms='error';
            break;
        default:
            respuesta = 'Respuesta no reconocida error de validacion en la insercion    ';
            statusCode = 400;
            statusms='error desconocido';
        }
        console.log('Respuesta enviada al cliente:', respuesta)
        enviarEmail(Correo_Electronico,asunto,tituloMensaje,mensajeCorreo);
        return res.status(statusCode).send({ status: statusms, message: respuesta } )
        
    } catch (error) {
        console.error('Error en el controlador de registro:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
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