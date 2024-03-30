const pool = require("../config/connection");
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt');
const {enviarEmail}=require('../services/email.service');

if(process.env.NODE_ENV !=="production"){
    require('dotenv/config');
  }
const {KEY,HOST,PORT}=process.env;

const recuperarContra2=async (req,res)=>{

    const token = req.body.token;
    const contra=req.body.valorConfirmacionContra;
    const contraEncrip=await bcrypt.hash(contra,10)

    const verificartoken= jwt.verify(token,KEY, (err, decoded) => {
        if (err) {
            console.error('Error al decodificar el token:', err);
            // Manejar el error aquí
        } else {
            
            // decoded contendrá la información decodificada del token
            // Puedes acceder a los datos que has incluido en el token, como el usuario y el DNI
            const usuario = decoded.user;
            const dni = parseInt(decoded.dni);
            const correo=decoded.correo
            return {usuario,dni,correo}
        }
    });
    
   try {
    
    const resultado=await actualizarContraUsuario(verificartoken.dni,verificartoken.usuario,contraEncrip)
    if (resultado){
        
        correoConfirmCambioContra(verificartoken.correo,verificartoken.usuario)
        return res.status(200).send({
            status: "ok",
            message: "Contraseña actualizada correctamente",
        });
    }
    else{
        return res.status(400).send({
            status: "error",
            message: "error al actualizar la contraseña",
          });
    }

    
   } catch (error) {
    console.error('Error en el controlador de actualizar contra:', error);
    return res.status(500).send({
      error: "Error interno del servidor",
    });
   }
    
    
   
}

async function actualizarContraUsuario(dni,usuario,contra){


    const queryText=`SELECT actuliazarcontra($1,$2,$3)`
    const queryParams=[dni,usuario,contra]
    const result=await pool.query(queryText,queryParams)
    if (result.rows[0].actuliazarcontra) {
        return true;
    }

  // If the password wasn't updated, return an error
    return false
    
}


const correoConfirmCambioContra=(email,usuario)=>{
    const fechaActual = new Date();
    const dia = fechaActual.getDate();
    const mes = fechaActual.getMonth() + 1; // Los meses comienzan desde 0
    const año = fechaActual.getFullYear();
    const horas = fechaActual.getHours();
    const minutos = fechaActual.getMinutes();
    const segundos = fechaActual.getSeconds();

    const fechaFormateada = `${año}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
    


    let enlace=`http://${HOST}/recuperarContra`;
    let asunto=`Se actualiza exitosamente la contraseña con fecha  : ${fechaFormateada}`;
    let tituloMensaje=`Actualizacion correcta de contraseña ` ;
    let mensajeCorreo = `
    Se realizo correctamente la actualizacion de contraseña para el usuario  ${usuario}.
    Si no fuiste tú, ingresa al siguiente enlace para proceder con el cambio de contraseña y asegurar tu cuenta : ${enlace}.
    De lo contrario puedes omitir este correo o comunicarte con tu administrador
     `;
    enviarEmail(email,asunto,tituloMensaje,mensajeCorreo);
}



module.exports={recuperarContra2}