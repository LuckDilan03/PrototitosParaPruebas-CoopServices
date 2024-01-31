const path = require('path');

const mostrarFormulario = (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/registro.html'));
};

const monstrarlogin =(req,res)=>{

    res.sendFile(path.join(__dirname,'../../frontend/inicioSesion.html'))
}

const mostrarnosotros =(req,res)=>{

    res.sendFile(path.join(__dirname,'../../frontend/about.html'))
}

const mostrarcontac =(req,res)=>{

    res.sendFile(path.join(__dirname,'../../frontend/contacts.html'))
}

module.exports = {mostrarFormulario, monstrarlogin,mostrarnosotros,mostrarcontac};