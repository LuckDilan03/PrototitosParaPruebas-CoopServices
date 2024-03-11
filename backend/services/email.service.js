const nodemailer = require('nodemailer');

if (process.env.NODE_ENV !== "production") {
    require('dotenv/config');
}



const transporter =nodemailer.createTransport({
host:"smtp.gmail.com",
port:process.env.EMAIL_PORT,
secure:true,
auth:{
    user:process.env.EMAIL,
    pass:process.env.PASSWORD
}
})



async function enviarEmail(to ,subject,titulo,mensaje){
 
    transporter.sendMail({
        from:process.env.EMAIL,
        to:to,
        subject:subject,
        html:crearEmailConfirmacionRegistro(mensaje,titulo)

    })

}

function crearEmailConfirmacionRegistro(mensaje,titulo){
    return`
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${titulo}</title>
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
      <h1>${titulo}</h1>
      <p>${mensaje}</p>
      <p>Gracias por utilizar nuestros servicios.</p>
    </div>
    </body>
    </html>`
}
module.exports = {enviarEmail}