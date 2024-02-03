const cerrarSesion = (req, res) => {
    // Elimina la cookie authToken
    res.clearCookie('authToken', { path: '/' });

    //  enviar una respuesta JSON de cierre de sesion
    res.json({ mensaje: 'Sesión cerrada con éxito' });
};

module.exports = { cerrarSesion };