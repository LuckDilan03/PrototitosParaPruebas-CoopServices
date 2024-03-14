const nodemailer = require('nodemailer');

if (process.env.NODE_ENV !== "production") {
    require('dotenv/config');
}

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

async function enviarEmail(to, subject, titulo, mensaje) {
  try {
      await transporter.sendMail({
          from: process.env.EMAIL,
          to: to,
          subject: subject,
          html: crearEmailConfirmacionRegistro(mensaje, titulo)
      });
      console.log('Correo electrónico enviado correctamente');
  } catch (error) {
      console.error('Error al enviar el correo electrónico:', error);
      throw error; // Relanza el error para que se maneje en el controlador
  }
}



function crearEmailConfirmacionRegistro(mensaje, titulo) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${titulo}</title>
    <style>
      body {
        font-family: 'Roboto', sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f6f6f6;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 40px;
        background-color: #ffffff;
        border-radius: 20px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
      }
      .header {
        text-align: center;
        margin-bottom: 30px;
      }
      .header h1 {
        color: #4CAF50;
        font-size: 36px;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 2px;
        margin: 0;
      }
      .logo-container {
        text-align: center;
        margin-bottom: 30px;
      }
      .logo {
        width: 200px;
        height: auto;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
      .message {
        color: #444444;
        font-size: 18px;
        line-height: 1.6;
        margin-bottom: 30px;
        text-align: justify;
      }
      .footer {
        text-align: center;
        margin-top: 30px;
      }
      .footer p {
        color: #888888;
        font-size: 14px;
        margin: 0;
      }
      .button {
        display: inline-block;
        padding: 15px 40px;
        background-color: #4CAF50;
        color: #ffffff;
        text-decoration: none;
        border-radius: 30px;
        transition: background-color 0.3s, transform 0.3s;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        font-size: 16px;
        border: none;
        outline: none;
        cursor: pointer;
      }
      .button:hover {
        background-color: #45a049;
        transform: translateY(-2px);
        box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
      }
    </style>
    </head>
    <body>
    <div class="container">
      <div class="logo-container">
      <a href="#"><img src="https://i.ibb.co/rybbQkc/logo-green-200x34.png" alt="Logo de la empresa" border="0"></a> 
      </div>
      <div class="header">
        <h1>${titulo}</h1>
      </div>
      <p class="message">${mensaje}</p>
      <div class="footer">
        <p>Gracias por utilizar nuestros servicios.</p>

        <a href="" class="button">Visitar nuestro sitio web</a>
        <a href="http://${process.env.HOST}:${process.env.PORT}" class="button">Visitar nuestro sitio web</a>

      </div>
    </div>
    </body>
    </html>
    `;
}

module.exports = { enviarEmail };
