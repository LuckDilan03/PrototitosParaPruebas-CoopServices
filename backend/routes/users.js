const auth = require('../middlewares/auth');
const controller = require("../controlers/Users");

const UserRoutes = (app) => {
    app.post('/login', (req, res) => {
      return controller.login(req, res);
    });
  
    app.post('/register', (req, res) => {
      return controller.register(req, res).then((respuesta) => {
        res.status(200).send(respuesta);
      });
    });
  
    app.get('/dashboard', auth, (req, res) => {
      res.status(200).send("Bienvenido a programación en español");
    });
  }

  
module.exports = UserRoutes;
