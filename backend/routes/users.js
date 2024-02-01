const auth = require('../middlewares/auth');
const controlerRegister = require("../controlers/register");
const controlerLogin=require('../controlers/login')

const UserRoutes = (app) => {
    app.post('/login', (req, res) => {
      return controlerLogin.login(req, res);
    });
  
    app.post('/register', (req, res) => {
      return controlerRegister.register(req, res).then((respuesta) => {
        res.status(200).send(respuesta);
      });
    });
  
    app.get('/dashboard', auth.verifyToken, auth.verifyRole(['admin', 'user']), (req, res) => {
      // Asegúrate de ajustar los roles permitidos según tu lógica
      const userRole = req.user.rol;
      if (userRole == '1') {
          // Envía el archivo HTML para el dashboard de administrador
          res.sendFile(path.join(__dirname, '../../frontend/dashboard'));
      } else if (userRole == '2') {
          // Envía el archivo HTML para el dashboard de usuario
          res.sendFile(path.join(__dirname, '../../frontend/dashboard/user.html'));
      } 
      else if (userRole == '3') {
        // Envía el archivo HTML para el dashboard de usuario
        res.sendFile(path.join(__dirname, '../../frontend/dashboard/user.html'));
    } 
    else if (userRole == '4') {
      // Envía el archivo HTML para el dashboard de usuario
      res.sendFile(path.join(__dirname, '../../frontend/dashboard/user.html'));
  } 
      else {
          // Envía el archivo HTML para el dashboard por defecto
          res.sendFile(path.join(__dirname, '../../frontend/dashboard/default.html'));
      }
  });
  }

  
module.exports = UserRoutes;
