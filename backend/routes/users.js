const auth = require('../middlewares/auth');
const controlerRegister = require("../controlers/register");
const controlerLogin=require('../controlers/login');
const controlerValidacion=require('../controlers/validacion');
const controlerListUsers=require('../controlers/listUsers');
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


    
    app.post('/cerrar-sesion', cerrarSesion);
  
    app.get('/admin',auth.verifyToken,controlerValidacion.mostrardashboard);
    
  // Agrega rutas específicas para cada tipo de dashboard
  

    app.get('/listUsers',controlerListUsers.listUsers);
  };

  
module.exports = UserRoutes;
