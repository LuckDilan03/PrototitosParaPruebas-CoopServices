const pool = require("../config/connection");
const jwt=require('jsonwebtoken');
const {enviarEmail}=require('../services/email.service');

if(process.env.NODE_ENV !=="production"){
    require('dotenv/config');
  }
const {KEY,PORT,HOST}=process.env;
  

async function confirmarUsuario(use, dni) {
    const queryText = `SELECT confirmarusuario ($1, $2)`;
    const queryParams = [use, dni];
    let result = await pool.query(queryText, queryParams);
    
    if (result.rows.length === 0) {
      return { status: 'error', message: 'las credenciales no coinciden o el usuario no existe' };
    }
    const respuesta = result.rows[0].confirmarusuario;
    
    return { status: 'ok', data: respuesta };
}

generarTokenCambioContra=(user,dni,correo)=>{
    return token =jwt.sign({user,dni,correo},KEY,{expiresIn: 600 })
}

const correoCambioContra=(token,email,usuario)=>{
    const fechaActual = new Date();
    const dia = fechaActual.getDate();
    const mes = fechaActual.getMonth() + 1; // Los meses comienzan desde 0
    const año = fechaActual.getFullYear();
    const horas = fechaActual.getHours();
    const minutos = fechaActual.getMinutes();
    const segundos = fechaActual.getSeconds();

    const fechaFormateada = `${año}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;


    let enlace=`${HOST}/recuperarContra2/${token}`;
    let asunto=`Solicitud de cambio de contraseña con fecha : ${fechaFormateada}`;
    let tituloMensaje=`¿ Estas intentando cambiar tu contraseña ?` ;
    let mensajeCorreo = `
    Se registró una nueva solicitud de cambio de contraseña para el usuario ${usuario}.
    Si fuiste tú, ingresa al siguiente enlace para proceder con el cambio de contraseña: ${enlace}.
    De lo contrario puedes omitir este correo o comunicarte con tu administrador
    Es posible ingresaran tu usuario por error `;
    enviarEmail(email,asunto,tituloMensaje,mensajeCorreo);
}

async function recuperarContra(req,res){
    const usuarioParam=req.params.usuario;
    const dni=parseInt(req.body.documento)
    let respuestaUser=await confirmarUsuario(usuarioParam,dni)
    let partes = respuestaUser.data.split(':');
    if (partes.length===1){

        return res.status(400).json({ status: 'error', message: respuestaUser.data });

    }
    // La parte después de los dos puntos estará en el segundo elemento del array
    let datos = partes[1].trim(); // trim() elimina los espacios en blanco al principio y al final del string
    
    if (datos.length>4){
        const token= generarTokenCambioContra(usuarioParam,dni,datos)
        const correo=datos
        console.log(correo)
        correoCambioContra(token,correo,usuarioParam);
        return res.status(200).json({ status: 'ok', message: respuestaUser.data });

    }
}

module.exports={recuperarContra}