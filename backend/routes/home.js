const controlador = require ('../controlers/home');

// rutas publicas del inicio 
const homeroutes =(app)=>{

    app.get('/index.html' ,(req, res) => {res.redirect('/');});

    app.get('/registrarse', controlador.mostrarFormulario);
    app.get('/registro.html', (req, res) => {res.redirect('/registrarse');});

    app.get('/iniciarSesion',controlador.monstrarlogin);
    app.get('/inicioSesion.html',  (req, res) => {res.redirect('/iniciarSesion');});

    app.get('/nosotros',controlador.mostrarnosotros);
    app.get('/about.html', (req, res) => {res.redirect('/nosotros');});


    app.get('/contacto',controlador.mostrarcontac);
    app.get('/contacts.html', (req, res) => {res.redirect('/contacto');});
    
    app.get('/recuperarContra',controlador.recuperarcontra);
    app.get('/recuperarContra.html', (req, res) => {res.redirect('/recuperarContra');});
}
module.exports = homeroutes;