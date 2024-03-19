document.addEventListener('DOMContentLoaded', () => {
    const formularioRegistro = document.getElementById('formulario-registro');
    const botones = document.querySelector('.botones');
    const camposMovil = {
        'Documento': 1,
        'Primer_Nombre': 2,
        'Segundo_Nombre': 3,
        'Primer_Apellido': 4,
        'Segundo_Apellido': 5,
        'Telefono': 6,
        'Direccion': 7,
        'Correo_Electronico': 8,
        'Contrasena': 9,
        'RepetirContrasena': 10
    };

    function reorganizarFormulario() {
        const grupos = Array.from(document.querySelectorAll('.grupo'));
        grupos.sort((a, b) => {
            const ordenCampoA = parseInt(a.dataset.orden);
            const ordenCampoB = parseInt(b.dataset.orden);
            return ordenCampoA - ordenCampoB;
        });

        grupos.forEach(grupo => {
            formularioRegistro.insertBefore(grupo, botones);
        });
    }

    // Ejecutar la función al cargar la página y al cambiar el tamaño de la ventana
    reorganizarFormulario();
    window.addEventListener('resize', reorganizarFormulario);
});
