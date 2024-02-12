const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');
const fileNameDisplay = document.querySelector('.file-name');


const expresiones = {
    DNI_Persona: /^\d{2,20}$/,
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    telefono: /^\d{10}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*().,])[\w!@#$%^&*().,]{8,}$/,
    direccion: /^[a-zA-ZÁ-ÿ\s#-,.0-9-]{1,60}$/,
    usuario:/^[a-zA-ZÁ-ÿ\s#-,.0-9-]{1,20}$/
};

const campos = {
    DNI_Persona: false,
    correo_Persona: false,
    Nombre_Persona: false,
    Segundo_Nombre_Persona: true,
    Apellido_Persona: false,
    Segundo_Apellido_Persona: true,
    Direccion_Persona: false,
    Telefono_Persona: false,
    usuario_deseado: false,
    Contrasena_deseada: false,
};

const validarCampo = (expresion, input, campo) => {
    const grupo = document.getElementById(`grupo__${campo}`);
    grupo.classList.toggle('formulario__grupo-incorrecto', !expresion.test(input.value));
    grupo.classList.toggle('formulario__grupo-correcto', expresion.test(input.value));

    const icono = document.querySelector(`#grupo__${campo} i`);
    icono.classList.toggle('fa-times-circle', !expresion.test(input.value));
    icono.classList.toggle('fa-check-circle', expresion.test(input.value));

    const error = document.querySelector(`#grupo__${campo} .formulario__input-error`);
    error.classList.toggle('formulario__input-error-activo', !expresion.test(input.value));

    campos[campo] = expresion.test(input.value);
};

const validarFormulario = (e) => {
    switch (e.target.name) {
        case 'DNI_Persona':
            validarCampo(expresiones.DNI_Persona, e.target, 'DNI_Persona');
            break;
        case 'correo_Persona':
            validarCampo(expresiones.correo, e.target, 'correo_Persona');
            break;
        case 'Nombre_Persona':
            validarCampo(expresiones.nombre, e.target, 'Nombre_Persona');
            break;
        case 'Segundo_Nombre_Persona':
            // No se realiza validación para Segundo Nombre si no es obligatorio.
            break;
        case 'Apellido_Persona':
            validarCampo(expresiones.nombre, e.target, 'Apellido_Persona');
            break;
        case 'Segundo_Apellido_Persona':
            // No se realiza validación para Segundo Apellido si no es obligatorio.
            break;
        case 'Direccion_Persona':
            validarCampo(expresiones.direccion, e.target, 'Direccion_Persona');
            break;
        case 'Telefono_Persona':
            validarCampo(expresiones.telefono, e.target, 'Telefono_Persona');
            break;
        case 'usuario_deseado':
            validarCampo(expresiones.usuario, e.target, 'usuario_deseado');
            break;
        case 'Contrasena_deseada':
            validarCampo(expresiones.password, e.target, 'Contrasena_deseada');
            break;
    }
};

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {

    if (
        campos.DNI_Persona &&
        campos.correo_Persona &&
        campos.Nombre_Persona &&
        campos.Apellido_Persona &&
        campos.Direccion_Persona &&
        campos.Telefono_Persona &&
        campos.usuario_deseado &&
        campos.Contrasena_deseada
    ) {
       /* window.location.href = "/register";*/

    } else {
        e.preventDefault();
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
    }


inputFile.addEventListener('change', () => {
    const fileName = inputFile.files[0] ? inputFile.files[0].name : 'Ningún archivo seleccionado';
    fileNameDisplay.textContent = fileName;
    
    // Cambiar el estilo del botón al seleccionar un archivo
    btnUpload.classList.add('file-selected');
});
    
// Puedes añadir esto en tu código para cambiar el color del botón al quitar el archivo seleccionado
inputFile.addEventListener('click', () => {
    btnUpload.classList.remove('file-selected');
});

});