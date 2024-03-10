const path = require('path');


  const mostrarSolicitudPrestamo = (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/solicitarPrestamo.html'));
  };

  const mostrarSolicitudRetiro = (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/solicitarRetiro.html'));
  };

  const mostrarOtraSolicitud = (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/'));
  };

  const mostrarSolictudesPendientesAsociados = (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/ListaSolicitudesMembresia.html'));
  };

  const mostrarListaAsociados = (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/ListaAsociados.html'));
  };

  const mostrarListaUsuarios = (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/listaUsuario.html'));
  };

  const mostrarSolicitudesPedientesPrestamos = (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/ListaSolicitudesPrestamo.html'));
  };

  const mostrarCrearRoles = (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/CrearRoles.html'));
  };
  
  const mostrarListaCuentasAhorro = (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/listaCuentaAhorros.html'));
  };

  const mostrarListaPersonas = (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/listaPersona.html'));
  };

  module.exports = {
    mostrarSolicitudPrestamo,
    mostrarSolicitudRetiro,
    mostrarOtraSolicitud,
    mostrarSolictudesPendientesAsociados,
    mostrarListaAsociados,
    mostrarListaUsuarios,
    mostrarSolicitudesPedientesPrestamos,
    mostrarCrearRoles,
    mostrarListaCuentasAhorro,
    mostrarListaPersonas};

