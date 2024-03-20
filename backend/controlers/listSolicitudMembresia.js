const pool = require('../config/connection');
const {enviarEmail}=require('../services/email.service');
const {dataUserAprobado,dataUserDenegado}=require('../controlers/dataUser');

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
    
    
    const queryText = `SELECT * FROM aprobarAsociado($1, $2, $3,$4,$5)`;
    const queryParams = [
        idSolicitud,
        informacionAdicional.saldoInicial,
        informacionAdicional.saldoAhorroVoluntario,
        informacionAdicional.numeroResolucion,
        informacionAdicional.esAdministrativo
        
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
        
        let mensajeCorreo = `
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
        if (informacionAdicional.esAdministrativo) {
        let fecha_inicio=new Date(userData[0].fecha_solicitud)
        fecha_inicio = fecha_inicio.toISOString().slice(0, 10);
         fecha_fin=new Date(userData[0].fecha_aprobacion)
         fecha_fin.setFullYear(fecha_fin.getFullYear() + 1);
         const FechaFinalizacion = fecha_fin.toISOString().slice(0, 10);
         mensajeCorreo=`
        Te damos la bienvenida como Administrador oficial.<br>
        A continuación, te proporcionaremos los datos básicos <br>
        que debes tener en cuenta como Administrador.<br><br><br>
        
        
                    DATOS PERSONALES:<br>
        Nombre Asociado Administrador: ${nombreCompleto}<br>
        
        Correo Registrado: ${userData[0].correo_persona}<br>
        
        Usuario De Acceso: ${userData[0].usuario_deseado}<br>
        
        Fecha De Aprobacion Administrativa: ${fecha_inicio}<br>
        
        Fecha Fin Campaña Administrativa: ${FechaFinalizacion}<br>
        

        `;}
        
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

    const { dniDenegado,idSolicitud, informacionAdicional } = req.body;
    const queryText = `SELECT * FROM denegarSolicitud($1, $2,$3)`;
    const queryParams = [
        idSolicitud,
        informacionAdicional.MotivoRechazo,
        informacionAdicional.numeroResolucion   
    ];

    try {
        await pool.query(queryText, queryParams);


        const userData = await dataUserDenegado(dniDenegado);
        console.log(userData);
        
        if (userData.error) {
            // Manejar el caso en el que no se encontraron datos para el usuario aprobado
            console.error('Error al obtener los datos del usuario Denegado:', userData.error);
            return res.status(404).send({ status: "error", message: "No se encontraron datos para el usuario aprobado" });
        }
        
        if (!userData[0].correo_persona) {
            // Manejar el caso en el que no se ha proporcionado una dirección de correo electrónico
            console.error('No se ha proporcionado una dirección de correo electrónico para el usuario Denegado');
            return res.status(400).send({ status: "error", message: "No se ha proporcionado una dirección de correo electrónico para el usuario aprobado" });
        }
        
        const nombreCompleto = `${userData[0].nombre_persona} ${userData[0].segundo_nombre_persona} ${userData[0].apellido_persona} ${userData[0].segundo_apellido_persona}`;
        const destinatario=userData[0].correo_persona;
        const mensajeCorreo = `
            Lo sentimos pero no fue posible Aprobar tu Solicitud <br>
            Los motivos de rechazo son los siguiente :<br>
            ${informacionAdicional.MotivoRechazo}<br><br>
            Soluciona estos inconvenientes antes de volverlo a intentar <br>
            Agredecemos tu interes 

        `;
        
        // Enviar el correo con los datos del usuario denegado
        enviarEmail(`${destinatario}`,`Denegacion de Solicitud Con Numero De Solicitud ${userData[0].id_solicitud}`, 
        `Vuelvelo A Intentar Apenas Soluciones Lo Siguiente: `, mensajeCorreo);
        // Responder con éxito al cliente de que se denego 
        return res.status(200).send({ status: "ok", message: "Solicitud denegada correctamente" });




        
        
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