const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
    DNI_Persona: /^\d{2,20}$/, // Solo números, hasta 20 dígitos.
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*().,])[\w!@#$%^&*().,]{8,}$/, // 8 o más caracteres con al menos 1 mayúscula, 1 minúscula y 1 carácter especial.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{10}$/ // 7 a 14 números.
}

const campos = {
    DNI_Persona: false,
    Correo_Persona: false,
    Nombre_Persona: false,
    Segundo_Nombre: true, // No es obligatorio, se establece como true por defecto.
    Apellido_Persona: false,
    Segundo_Apellido: true, // No es obligatorio, se establece como true por defecto.
    Direccion_Persona: false,
    telefono_persona: false,
    usuario_deseado: false,
    contraseña_deseada: false
}

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "DNI_Persona":
            validarCampo(expresiones.DNI_Persona, e.target, 'DNI_Persona');
            break;
        case "Correo_Persona":
            validarCampo(expresiones.correo, e.target, 'Correo_Persona');
            break;
        case "Nombre_Persona":
            validarCampo(expresiones.nombre, e.target, 'Nombre_Persona');
            break;
        case "Segundo_Nombre":
            // No se realiza validación para Segundo Nombre si no es obligatorio.
            break;
        case "Apellido_Persona":
            validarCampo(expresiones.nombre, e.target, 'Apellido_Persona');
            break;
        case "Segundo_Apellido":
            // No se realiza validación para Segundo Apellido si no es obligatorio.
            break;
        case "Direccion_Persona":
            validarCampo(expresiones.nombre, e.target, 'Direccion_Persona');
            break;
        case "telefono_persona":
            validarCampo(expresiones.telefono, e.target, 'telefono_persona');
            break;
        case "usuario_deseado":
            validarCampo(expresiones.nombre, e.target, 'usuario_deseado');
            break;
        case "contraseña_deseada":
            validarCampo(expresiones.password, e.target, 'contraseña_deseada');
            validarPassword2();
            break;
    }
}

const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos[campo] = true;
    } else {
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos[campo] = false;
    }
}

const validarPassword2 = () => {
    const inputPassword1 = document.getElementById('contraseña_deseada');
    const inputPassword2 = document.getElementById('password2');

    if (inputPassword1.value !== inputPassword2.value) {
        document.getElementById(`grupo__password2`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__password2 i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__password2 i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos['contraseña_deseada'] = false;
    } else {
        document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__password2`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__password2 i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__password2 i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos['contraseña_deseada'] = true;
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const terminos = document.getElementById('terminos');

    if (
        campos.DNI_Persona &&
        campos.Correo_Persona &&
        campos.Nombre_Persona &&
        campos.Apellido_Persona &&
        campos.Direccion_Persona &&
        campos.telefono_persona &&
        campos.usuario_deseado &&
        campos.contraseña_deseada &&
        terminos.checked
    ) {
        formulario.reset();

        document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
        setTimeout(() => {
            document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
        }, 5000);

        document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
            icono.classList.remove('formulario__grupo-correcto');
        });

        /* window.location.href = "";*/
    } else {
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
    }
});
