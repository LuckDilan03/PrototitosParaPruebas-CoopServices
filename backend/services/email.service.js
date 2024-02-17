const nodemailer = require('nodemailer');

if (process.env.NODE_ENV !== "production") {
    require('dotenv/config');
}



const transporter =nodemailer.createTransport({
host:process.env.EMAIL_HOST,
port:process.env.EMAIL_PORT,
secure:true,
auth:{
    user:process.env.EMAIL,
    pass:process.env.PASSWORD
}
})

async function enviarEmail(direccion,nuemeroSolicitud){
    transporter.sendMail({
        from:"",
        to:"",
        subject:"",
        html:crearEmailConfirmacionRegistro()

    })

}

function crearEmailConfirmacionRegistro(){
    return`
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro Exitoso</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #ffffff;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      h1 {
        color: #333333;
      }
      p {
        color: #666666;
        margin-bottom: 20px;
      }
    </style>
    </head>
    <body>
    <div class="container">
      <h1>Registro Exitoso</h1>
      <p>Su solicitud ha sido registrada exitosamente con numero . Espere una respuesta dentro de los próximos 15 días hábiles.</p>
      <p>Gracias por utilizar nuestros servicios.</p>
    </div>
    </body>
    </html>`
}