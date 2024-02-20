
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
        Segundo_Apellido: true,
        Correo_Electronico: false,
        Segundo_Nombre: true,
        Telefono: false,
        Contrasena: false
    };

    const validarCampo = (expresion, input, campo) => {
        const grupo = document.getElementById(`grupo__${campo}`);
        grupo.classList.toggle('formulario__grupo-incorrecto', !expresion.test(input.value));
        grupo.classList.toggle('formulario__grupo-correcto', expresion.test(input.value));
    
        const icono = document.querySelector(`#grupo__${campo} i`);
        icono.classList.toggle('fa-times-circle', !expresion.test(input.value));
        icono.classList.toggle('fa-check-circle', expresion.test(input.value));
    
        const error = document.querySelector(`#grupo__${campo} .formulario__input-error`);
        error.innerHTML = ''; // Limpiar mensajes de error previos
    
        if (!expresion.test(input.value)) {
            if (campo === 'Contrasena') {
                error.innerHTML += '<li type="circle">La contraseña debe tener al menos 8 caracteres.</li>';
                error.innerHTML += '<li type="circle">Debe contener al menos una mayúscula y una minúscula.</li>';
                error.innerHTML += '<li type="circle">Debe contener al menos un carácter especial (!@#$%^&*().,).</li>';
            } else {
                error.innerHTML += '<li type="circle">Ingrese un valor válido.</li>';
            }
        }
    
        error.classList.toggle('formulario__input-error-activo', !expresion.test(input.value));
    
        campos[campo] = expresion.test(input.value);
    };
    
    

    

    const validarFormulario = (e) => {
        switch (e.target.name) {
            case 'Documento':
                validarCampo(expresiones.Documento, e.target, 'Documento');
                break;
            case 'Primer_Apellido':
                validarCampo(expresiones.Primer_Apellido, e.target, 'Primer_Apellido');
                break;
            case 'Direccion':
                validarCampo(expresiones.Direccion, e.target, 'Direccion');
                break;
            case 'Segundo_Apellido':
                // No se realiza validación para Segundo Nombre si no es obligatorio.
                break;
            case 'Correo_Electronico':
                validarCampo(expresiones.Correo_Electronico, e.target, 'Correo_Electronico');
                break;
            case 'Segundo_Nombre':
                // No se realiza validación para Segundo Apellido si no es obligatorio.
                break;
            case 'Primer_Nombre':
                validarCampo(expresiones.Primer_Nombre, e.target, 'Primer_Nombre');
                break;
            case 'Telefono':
                validarCampo(expresiones.Telefono, e.target, 'Telefono');
                break;
            case 'Contrasena':
                validarCampo(expresiones.Contrasena, e.target, 'Contrasena');
                break;
        }
    };

    // Agregar listeners de eventos para validar el formulario
    inputs.forEach((input) => {
        input.addEventListener('keyup', validarFormulario);
        input.addEventListener('blur', validarFormulario);
    });

    
formulario.addEventListener('submit', (e) => {

    if (
        campos.Documento &&
        campos.Primer_Apellido &&
        campos.Direccion &&
        campos.Primer_Nombre &&
        campos.Correo_Electronico &&
        campos.Telefono &&
        campos.Contrasena

    ) {
       /* window.location.href = "/register";*/

    } else {
        e.preventDefault();
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
    }





});
