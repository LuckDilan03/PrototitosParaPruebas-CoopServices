const pool = require('../config/connection');
const {enviarEmail}=require('../services/email.service');
const {dataUserAprobado}=require('../controlers/dataUser');

async function listSolicitudMembresia(req, res) {
  try {
    const result = await pool.query('SELECT * FROM tab_solicitarmembresia');
    res.json(result.rows);
  } catch (error) {
    console.error ('Error al obtener datos de la tabla desde la base de datos: ', error );
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

async function aprobarUsuario(req, res) {
    if (!req.body || typeof req.body !== 'object' || !('idSolicitud' in req.body) || !('informacionAdicional' in req.body)) {
        return res.status(400).send({ status: "error", message: "El cuerpo de la solicitud no contiene los datos necesarios." });
    }

    const { idSolicitud, dniAprobado, informacionAdicional } = req.body;
    const queryText = `SELECT * FROM aprobarAsociado($1, $2, $3,$4)`;
    const queryParams = [
        idSolicitud,
        informacionAdicional.saldoInicial,
        informacionAdicional.saldoAhorroVoluntario,
        informacionAdicional.numeroResolucion
    ];

    try {
        await pool.query(queryText, queryParams);

        // Obtener los datos del usuario aprobado
        
        const userData = await dataUserAprobado(dniAprobado);
        console.log(userData);
        
        if (userData.error) {
            // Manejar el caso en el que no se encontraron datos para el usuario aprobado
            console.error('Error al obtener los datos del usuario aprobado:', userData.error);
            return res.status(404).send({ status: "error", message: "No se encontraron datos para el usuario aprobado" });
        }
        
        if (!userData[0].correo_persona) {
            // Manejar el caso en el que no se ha proporcionado una dirección de correo electrónico
            console.error('No se ha proporcionado una dirección de correo electrónico para el usuario aprobado');
            return res.status(400).send({ status: "error", message: "No se ha proporcionado una dirección de correo electrónico para el usuario aprobado" });
        }
        
        const nombreCompleto = `${userData[0].nombre_persona} ${userData[0].segundo_nombre_persona} ${userData[0].apellido_persona} ${userData[0].segundo_apellido_persona}`;
        const destinatario=userData[0].correo_persona;
        const mensajeCorreo = `
            Te damos la bienvenida como asociado oficial.<br>
            A continuación, te proporcionaremos los datos básicos <br>
            que debes tener en cuenta como asociado.<br><br><br>
            
            
                        DATOS PERSONALES:<br>
            Nombre Asociado Registrado: ${nombreCompleto}<br>
            
            Correo Registrado: ${userData[0].correo_persona}<br>
            
            Usuario De Acceso: ${userData[0].usuario_deseado}<br>
            
            Numero De Cuenta Asociada: ${userData[0].numero_cuenta}<br>
            
            Saldo Inicial: ${userData[0].saldo_cuenta}<br>
            
            Aporte Obligatorio: ${userData[0].aporte_mensual}<br>
            
            Aporte Inicial: ${userData[0].monto_aporte}<br>
        `;
        
        // Enviar el correo con los datos del usuario aprobado
        enviarEmail(`${destinatario}`,`Aprobación de Solicitud Con Numero De Solicitud ${userData[0].id_solicitud}`, 
        `¡Felicidades Ahora Eres Parte De CoopServices!`, mensajeCorreo);
        
        // Responder con éxito al cliente
        return res.status(200).send({ status: "ok", message: "Solicitud aprobada correctamente" });
         

        
    } catch (error) {
        console.error('Error en la aprobación de solicitud:', error);
        return res.status(500).send({ status: "error", message: "Error interno del servidor al aprobar usuario" });
    }
}


async function DenegarSolicitud(req,res){
  if (!req.body || typeof req.body !== 'object' || !('idSolicitud' in req.body) || !('informacionAdicional' in req.body)) {
    return res.status(400).send({ status: "error", message: "El cuerpo de la solicitud no contiene los datos necesarios." } );
    }

    const { idSolicitud, informacionAdicional } = req.body;
    const queryText = `SELECT * FROM denegarSolicitud($1, $2,$3)`;
    const queryParams = [
        idSolicitud,
        informacionAdicional.motivo,
        informacionAdicional.numeroResolucion   
    ];

    try {
        await pool.query(queryText, queryParams);

        const userData = await dataUserAprobado(dniAprobado);
        console.log(userData);
        
        if (userData.error) {
            // Manejar el caso en el que no se encontraron datos para el usuario aprobado
            console.error('Error al obtener los datos del usuario aprobado:', userData.error);
            return res.status(404).send({ status: "error", message: "No se encontraron datos para el usuario aprobado" });
        }
        
        if (!userData[0].correo_persona) {
            // Manejar el caso en el que no se ha proporcionado una dirección de correo electrónico
            console.error('No se ha proporcionado una dirección de correo electrónico para el usuario aprobado');
            return res.status(400).send({ status: "error", message: "No se ha proporcionado una dirección de correo electrónico para el usuario aprobado" });
        }
        
        const nombreCompleto = `${userData[0].nombre_persona} ${userData[0].segundo_nombre_persona} ${userData[0].apellido_persona} ${userData[0].segundo_apellido_persona}`;
        const destinatario=userData[0].correo_persona;
        const mensajeCorreo = `
            Te damos la bienvenida como asociado oficial.
            A continuación, te proporcionaremos los datos básicos que debes tener en cuenta como asociado:
            DATOS PERSONALES:
            Nombre Asociado Registrado: ${nombreCompleto}
            Correo Registrado: ${userData[0].correo_persona}
            Usuario De Acceso: ${userData[0].usuario_deseado}
            Numero De Cuenta Asociada: ${userData[0].numero_cuenta}
            Saldo Inicial: ${userData[0].saldo_cuenta}
            Aporte Obligatorio: ${userData[0].aporte_mensual}
            Aporte Inicial: ${userData[0].monto_aporte}
        `;
        
        // Enviar el correo con los datos del usuario aprobado
        enviarEmail(`${destinatario}`,`Aprobación de Solicitud Con Numero De Solicitud ${userData[0].id_solicitud}`, 
        `¡Felicidades Ahora Eres Parte De CoopServices!`, mensajeCorreo);




        
        
    } catch (error) {
        console.error('Error en la denegacion de solicitud:', error);
        return res.status(500).send({ status: "ok", message: "Error interno del servidor al denegar usuario" } );
    
    }

}

module.exports = {
  
    listSolicitudMembresia,
    aprobarUsuario,
    DenegarSolicitud
};