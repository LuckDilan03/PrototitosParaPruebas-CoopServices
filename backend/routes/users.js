const auth = require('../middlewares/auth');
const controlerRegister = require("../controlers/register2");
const controlerLogin=require('../controlers/login');
const controlerPassword=require('../controlers/actualizarContra')
const {cerrarSesion}=require('../controlers/cerrarSesion');
const {upload} =require('../controlers/multerConfig');
const {recuperarContra}=require('../controlers/recuperarContra')
const {recuperarContra2}=require('../controlers/recuperarContra2')


const UserRoutes = (app) => {

  app.post('/cerrar-sesion', cerrarSesion);

  app.post('/login',controlerLogin.login)
  app.post('/register',upload.single('Soporte_Documento'),controlerRegister.register)
  app.put('/actuliazarContra/:usuario',controlerPassword.actualizarContra)
  app.post('/recuperarContra1/:usuario',recuperarContra)
  app.post('/recuperarContra2',recuperarContra2)
  
  
  
  
    
    
  // Agrega rutas específicas para cada tipo de dashboard
 
  }
 


  
module.exports = UserRoutes;
