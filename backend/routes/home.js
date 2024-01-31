const controlador = require ('../controlers/home');

const homeroutes =(app)=>{

    app.get('/registrarse', controlador.mostrarFormulario);

    app.get('/iniciarSesion',controlador.monstrarlogin);

    app.get('/nosotros',controlador.mostrarnosotros);

    app.get('/contacto',controlador.mostrarcontac);
}
module.exports = homeroutes;