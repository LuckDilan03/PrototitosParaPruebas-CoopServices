document.addEventListener("DOMContentLoaded", function() {
    const formulario = document.getElementById('formulario-registro');
    const inputs = document.querySelectorAll('#formulario-registro input');
    const errorRegistro = document.querySelector('.error');

    // Expresiones regulares para la validación
    const expresiones = {
        Documento: /^\d{2,20}$/,
        Primer_Apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
        Direccion: /^[a-zA-ZÁ-ÿ\s#-,.0-9-]{1,60}$/,
        Primer_Nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
        Segundo_Apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
        Correo_Electronico: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        Segundo_Nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
        Telefono: /^\d{10}$/,
        Contrasena: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*().,])[\w!@#$%^&*().,]{8,}$/
    };

    // Estado de los campos
    const campos = {
        Documento: false,
        Primer_Apellido: false,
        Direccion: false,
        Primer_Nombre: false,
        Segundo_Apellido: false,
        Correo_Electronico: false,
        Segundo_Nombre: false,
        Telefono: false,
        Contrasena: false
    };

    // Función para validar cada campo
    const validarCampo = (expresion, input, campo) => {
        const grupo = input.parentElement;
        grupo.classList.toggle('formulario__grupo-incorrecto', !expresion.test(input.value));
        grupo.classList.toggle('formulario__grupo-correcto', expresion.test(input.value));
        campos[campo] = expresion.test(input.value);
    };

    // Función para validar el formulario completo
    const validarFormulario = () => {
        inputs.forEach((input) => {
            const campo = input.name;
            if (campo in expresiones) {
                validarCampo(expresiones[campo], input, campo);
            }
        });
    };

    // Agregar listeners de eventos para validar el formulario
    inputs.forEach((input) => {
        input.addEventListener('keyup', validarFormulario);
        input.addEventListener('blur', validarFormulario);
    });

    // Listener de evento para el envío del formulario
    formulario.addEventListener('submit', (e) => {
        validarFormulario(); // Realizar una última validación antes de enviar el formulario

        // Verificar si todos los campos son válidos
        const esFormularioValido = Object.values(campos).every((campo) => campo);

        if (!esFormularioValido) {
            e.preventDefault(); // Evitar que se envíe el formulario si hay campos inválidos
            errorRegistro.classList.remove('escondido');
        } else {
            // Aquí puedes enviar el formulario o realizar otras acciones
            // formulario.submit();
        }
    });

    // Resto de tu código...
});
