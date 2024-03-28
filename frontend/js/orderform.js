document.addEventListener('DOMContentLoaded', () => {
    const formularioRegistro = document.getElementById('formulario-registro');
    const contenedorFormulario = document.querySelector('.form-container');

    const camposMovil = {
        'Documento': 1,
        'Primer_Nombre': 2,
        'Segundo_Nombre': 3,
        'Primer_Apellido': 4,
        'Segundo_Apellido': 5,
        'Correo_Electronico': 6,
        'Contrasena': 7,
        'RepetirContrasena': 8,
        'Telefono': 9,
        'Direccion': 10,
        'error-file': 11,
    };

    function reorganizarFormulario() {
        const grupos = Array.from(document.querySelectorAll('.grupo'));
        grupos.sort((a, b) => {
            const ordenCampoA = camposMovil[a.querySelector('input').id];
            const ordenCampoB = camposMovil[b.querySelector('input').id];
            return ordenCampoA - ordenCampoB;
        });

        grupos.forEach(grupo => {
            contenedorFormulario.appendChild(grupo);
        });
    }

    // Ejecutar la función al cargar la página y al cambiar el tamaño de la ventana
    reorganizarFormulario();
    window.addEventListener('resize', reorganizarFormulario);
});
