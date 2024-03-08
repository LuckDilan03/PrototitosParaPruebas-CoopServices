const auth = require('../middlewares/auth');
const controlerRegister = require("../controlers/register");
const controlerLogin=require('../controlers/login');
const controlerValidacion=require('../controlers/validacion');
const controlerListUsers=require('../controlers/listUsers');
const controlerListSolicitudMembresia=require('../controlers/listSolicitudMembresia');
const controlerListAsociados=require('../controlers/listAsociados');

const {cerrarSesion}=require('../controlers/cerrarSesion')

const UserRoutes = (app) => {
    app.post('/login', (req, res) => {
      return controlerLogin.login(req, res);
    });
  
    app.post('/register', (req, res) => {
      return controlerRegister.register(req, res).then((respuesta) => {
        res.status(200).send(respuesta);
      });
    });
    
    app.get('/dashboard.html',auth.verifyToken,controlerValidacion.mostrardashboard);


    
    app.post('/cerrar-sesion', cerrarSesion);
  
    app.get('/admin',auth.verifyToken,controlerValidacion.mostrardashboard);
    
    app.post('/aprobarSolicitud', (req, res) => {
      return controlerListSolicitudMembresia.aprobarUsuario(req, res);
    });
  // Agrega rutas específicas para cada tipo de dashboard
  
    
    app.get('/listUsers',controlerListUsers.listUsers);
    app.get('/listAsociados',controlerListAsociados.listAsociados);
    app.get('/listSolicitudMembresia',controlerListSolicitudMembresia.listSolicitudMembresia);

  };

  
module.exports = UserRoutes;
