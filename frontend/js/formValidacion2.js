document.addEventListener('DOMContentLoaded', () => {
    const formularioRegistro = document.getElementById('formulario-registro');
    const inputs = document.querySelectorAll('#formulario-registro input');
    const passwordInput = document.getElementById('Contrasena');
    const requisitosContrasena = document.getElementById('requisitos-contrasena');

    const expresiones = {
        Documento: /^\d{3,}$/, // Expresión para validar el número de documento
        Primer_Apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Expresión para validar el primer apellido
        Direccion: /^[a-zA-Z0-9\s\#\-\.\,]{3,80}$/, // Expresión para validar la dirección
        Primer_Nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Expresión para validar el primer nombre
        Segundo_Apellido: /^[a-zA-ZÀ-ÿ\s]{0,40}$/, // Expresión para validar el segundo apellido
        Correo_Electronico: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, // Expresión para validar el correo electrónico
        Segundo_Nombre: /^[a-zA-ZÀ-ÿ\s]{0,40}$/, // Expresión para validar el segundo nombre
        Telefono: /^\d{10}$/, // Expresión para validar el número de teléfono
        Contrasena: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, // Expresión para validar la contraseña
    };

    const mostrarRequisitosContrasena = (requisitos) => {
        if (requisitos.length === 0) {
            requisitosContrasena.classList.add('escondido');
        } else {
            requisitosContrasena.classList.remove('escondido');
            requisitosContrasena.innerHTML = requisitos.map(item => `<li>${item}</li>`).join('');
        }
    };

    const validarCampo = (input, expresion) => {
        const valor = input.value.trim();
        const esValido = expresion.test(valor);
        const grupo = input.parentElement;
        const icono = grupo.querySelector('.formulario__validacion-estado');

        if (esValido) {
            grupo.classList.remove('formulario__grupo-incorrecto');
            icono.classList.remove('fa-times-circle');
            icono.classList.add('fa-check-circle');
        } else {
            grupo.classList.add('formulario__grupo-incorrecto');
            icono.classList.remove('fa-check-circle');
            icono.classList.add('fa-times-circle');
        }

        return esValido;
    };

    const validarContrasena = () => {
        const contrasena = passwordInput.value.trim();
        const requisitos = [];

        if (contrasena.length < 8) {
            requisitos.push('La contraseña debe tener un mínimo de 8 dígitos.');
        }

        if (!/[a-z]/.test(contrasena) || !/[A-Z]/.test(contrasena)) {
            requisitos.push('Debe tener mínimo una letra mayúscula y una minúscula.');
        }

        if (!/[\W_]/.test(contrasena)) {
            requisitos.push('Debe tener mínimo un carácter especial (!@#$%^&*().,)');
        }

        mostrarRequisitosContrasena(requisitos);

        return requisitos.length === 0;
    };

    const validarFormulario = (e) => {
        const input = e.target;

        if (input.name === 'Contrasena') {
            validarContrasena();
        } else {
            validarCampo(input, expresiones[input.name]);
        }
    };

    inputs.forEach((input) => {
        input.addEventListener('keyup', validarFormulario);
        input.addEventListener('blur', validarFormulario);
    });

    formularioRegistro.addEventListener('submit', (e) => {
        e.preventDefault();
        let formularioValido = true;

        inputs.forEach((input) => {
            if (input.name === 'Contrasena') {
                formularioValido = validarContrasena() && formularioValido;
            } else {
                formularioValido = validarCampo(input, expresiones[input.name]) && formularioValido;
            }
        });

        if (formularioValido) {
            formularioRegistro.submit();
        } else {
            const error = document.querySelector('.error');
            error.classList.remove('escondido');
        }
    });

});
