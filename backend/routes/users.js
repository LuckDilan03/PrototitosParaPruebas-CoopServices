const auth = require('../middlewares/auth');
const controlerRegister = require("../controlers/register2");
const controlerLogin=require('../controlers/login');
const {cerrarSesion}=require('../controlers/cerrarSesion');
const upload =require('../controlers/multerConfig');



const UserRoutes = (app) => {

  app.post('/cerrar-sesion', cerrarSesion);

  app.post('/login',controlerLogin.login)
  app.post('/register',upload.single('Soporte_Documento'),controlerRegister.register)

    
  
    
    
  // Agrega rutas específicas para cada tipo de dashboard
 
  }
 


  
module.exports = UserRoutes;
