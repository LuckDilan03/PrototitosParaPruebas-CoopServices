const jwt = require('jsonwebtoken');


if (process.env.NODE_ENV !== "production") {
    require('dotenv/config');
}

const { KEY } = process.env;

const path = require('path');

const mostrardashboard = (req, res) => {
    const token = req.cookies.authToken;
    const decodificado=jwt.decode(token,KEY);
    if(decodificado.rol===1){
      res.sendFile(path.join(__dirname, '../../frontend/dashboard.html'));
    }
    if(decodificado.rol===2){
      res.sendFile(path.join(__dirname, '../../frontend/MiCuenta.html'));
    }
    if(decodificado.rol===3){
      res.sendFile(path.join(__dirname, '../../frontend/about.html'));
    }
    if(decodificado.rol===4){
      res.sendFile(path.join(__dirname, '../../frontend/about.html'));
    }
  };

  module.exports = {mostrardashboard};