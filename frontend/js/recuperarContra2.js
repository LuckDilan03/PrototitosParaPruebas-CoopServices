addEventListener('DOMContentLoaded', () => {
    const nuevaContra = document.getElementById('NuevaContrasena');
    const confirmacionContra = document.getElementById('VerificarContrasena');
    const enviar = document.getElementById('enviar');
    const mostrarContrasenas = document.getElementById('eye-icon');
    const ocultarContrasenas = document.getElementById('eye-off-icon');
    const errorContrasenas = document.getElementById('error');

    const url = new URL(window.location.href);
    const pathname = url.pathname;
    const token = pathname.split('/')[2];

    // Función para mostrar contraseñas
    mostrarContrasenas.addEventListener('click', () => {
        nuevaContra.type = 'text';
        confirmacionContra.type = 'text';
        mostrarContrasenas.style.display = 'none';
        ocultarContrasenas.style.display = 'block';
    });

    // Función para ocultar contraseñas
    ocultarContrasenas.addEventListener('click', () => {
        nuevaContra.type = 'password';
        confirmacionContra.type = 'password';
        mostrarContrasenas.style.display = 'block';
        ocultarContrasenas.style.display = 'none';
    });

    // Función para validar las contraseñas
    function validarContrasenas() {
        const valorNuevaContra = nuevaContra.value;
        const valorConfirmacionContra = confirmacionContra.value;
        const requisitos = [];

        if (valorNuevaContra.length < 8) {
            requisitos.push('La contraseña debe tener un mínimo de 8 dígitos.');
        }
        if (!/[a-z]/.test(valorNuevaContra) || !/[A-Z]/.test(valorNuevaContra)) {
            requisitos.push('Debe tener mínimo una letra mayúscula y una minúscula.');
        }
        if (valorNuevaContra !== valorConfirmacionContra) {
            requisitos.push('Las contraseñas no coinciden');
        }

        if (requisitos.length > 0) {
            const errorHTML = requisitos.map(req => `<li>${req}</li>`).join('');
            errorContrasenas.innerHTML = `<ul>${errorHTML}</ul>`;
            errorContrasenas.style.display = 'block';
            enviar.disabled = true; // Deshabilitar el botón
        } else {
            errorContrasenas.style.display = 'none';
            enviar.disabled = false; // Habilitar el botón
        }
    }

    // Validar contraseñas en tiempo real al ingresar la nueva contraseña
    nuevaContra.addEventListener('input', validarContrasenas);

    // Validar contraseñas en tiempo real al ingresar la confirmación de la contraseña
    confirmacionContra.addEventListener('input', validarContrasenas);

    // Deshabilitar el botón al cargar la página si no se cumplen los requisitos
    enviar.disabled = true;

    // Event listener para enviar el formulario
    enviar.addEventListener('click', async () => {
        // Resto del código para enviar el formulario
    });
});
