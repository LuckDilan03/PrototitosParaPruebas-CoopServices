const path = require('path');

const mostrarFormulario = (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/registro2.html'));
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

const recuperarcontra =(req,res)=>{

    res.sendFile(path.join(__dirname,'../../frontend/recuperarContra.html'))
}


module.exports = {mostrarFormulario, monstrarlogin,mostrarnosotros,mostrarcontac,recuperarcontra};