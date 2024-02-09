const VistasAdmin=require('../controlers/vistasAdmin');
const controlerListSolicitudMembresia=require('../controlers/listSolicitudMembresia')
const auth = require('../middlewares/auth');
const controlerValidacion=require('../controlers/validacion');



const adminRoutes = (app)=>{
    

    
    /*rutas del admin y de dasboard.html*/
    app.get('/admin',auth.verifyToken,controlerValidacion.mostrardashboard);
    app.get('/dashboard.html', auth.verifyToken, (req, res) => {res.redirect('/admin');});

   

  /*rutas del formulario de prestamos y su html*/
    app.get('/solicitarPrestamo',auth.verifyToken,VistasAdmin.mostrarSolicitudPrestamo);
    app.get('/solicitarPrestamo.html', auth.verifyToken, (req, res) => {res.redirect('/admin');});
    app.post('/formularioPrestamo',/*aca debe ir el controlador del post para el formulario*/ );


  /*rutas del formulario de retiro y su html*/
    app.get('/solicitarRetiro',auth.verifyToken,VistasAdmin.mostrarSolicitudRetiro);
    app.get('/solicitarRetiro.html', auth.verifyToken, (req, res) => {res.redirect('/admin');});
    app.post('/formularioRetiro',/*aca debe ir el controlador del post para el formulario*/);


  /*rutas del formulario de otra solicitud y su html*/
    app.get('/otroTipoSolicitud',auth.verifyToken,VistasAdmin.mostrarOtraSolicitud);
    app.get('/otroTipoSolicitud.html', auth.verifyToken, (req, res) => { res.redirect('/admin');});
    app.get('/listSolicitudMembresia',/*aca debe ir el controlador del post para el formulario*/);
  /*rutas del listado de solicitudes */
    app.get('/SolitudesPendientes',auth.verifyToken,VistasAdmin.mostrarSolictudesPendientesAsociados)
    app.get('/ListaSolicitudesMembresia.html', auth.verifyToken, (req, res) => {res.redirect('/SolitudesPendientes');});
    app.get('/listSolicitudMembresia',auth.verifyToken,controlerListSolicitudMembresia.listSolicitudMembresia);


  /*rutas del listado de asociados en el sistema */
    app.get('/asociadosAprobados',auth.verifyToken,VistasAdmin.mostrarListaAsociados);
    app.get('/ListaAsociados.html', auth.verifyToken, (req, res) => {res.redirect('/asociadosAprobados');});
    app.get('/listAsociadosAprobados',/*aca debe ir el controlador del get de la lista para el formulario*/);


  /*rutas del listado de usuarios del sistema */
    app.get('/usuarioSistema',auth.verifyToken,VistasAdmin.mostrarListaUsuarios);
    app.get('/listaUsuario.html', auth.verifyToken, (req, res) => {res.redirect('/asociadosAprobados');});
    app.get('/listarUsuarioSistema',/*aca debe ir el controlador del get de la lista para el formulario*/);


  /*rutas del listado de solicitudes de prestamos */
    app.get('/solicitudesPrestamo',auth.verifyToken,VistasAdmin.mostrarSolicitudesPedientesPrestamos);
    app.get('ListaSolicitudesPrestamo.html', auth.verifyToken, (req, res) => {res.redirect('/solicitudesPrestamo');});
    app.get('/listarSolicitudesPrestamo',/*aca debe ir el controlador del get de la lista para el formulario*/);


  /*rutas del CRUD de roles */
    app.get('/crearRoles',auth.verifyToken,VistasAdmin.mostrarCrearRoles);
    app.get('CrearRoles.html', auth.verifyToken, (req, res) => {res.redirect('/solicitudesPrestamo');});
    app.post('/formularioRoles',/*aca debe ir el controlador del post de la lista para el formulario*/);

  /*rutas del listado de cuentas de ahorros */

    app.get('/cuentasAhorro',auth.verifyToken,VistasAdmin.mostrarListaCuentasAhorro);
    app.get('listaCuentaAhorros.html', auth.verifyToken, (req, res) => {res.redirect('/solicitudesPrestamo');});
    app.get('/listarCuentasAhorro',/*aca debe ir el controlador del post de la lista para el formulario*/);
}

module.exports = adminRoutes;