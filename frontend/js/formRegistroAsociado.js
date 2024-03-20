document.addEventListener('DOMContentLoaded', () => {
    obtenerDatosSolicitud();

    // Agregar eventos para el filtro
    $('#filterCriteria').on('change', function() {
        applyFilter($(this).val(), $('#searchInput').val());
    });

    $('#searchInput').on('keyup', function() {
        applyFilter($('#filterCriteria').val(), $(this).val());
    });
});

const id=document.getElementById('idSolicitud');
const dni=document.getElementById('DniAsociado');
const primerNombre=document.getElementById('PrimerNombre');
const segundoNombre=document.getElementById('SegundoNombre');
const primerApellido=document.getElementById('PrimerApellido');
const segundoApellido=document.getElementById('SegundoApellido');
const direccion=document.getElementById('Direccion');
const telefono =document.getElementById('Telefono');
const correo=document.getElementById('CorreoElectronico');
const actualizar=document.getElementById('Actualizar');
const eliminar=document.getElementById('Eliminar');
const volver=document.getElementById('Volver');
// Función para mostrar alerta de error
const mostrarError = (mensaje) => {
    alert(mensaje);
};

// Función para validar el campo DNI
const validarDNI = () => {
    const valorDNI = dni.value.trim();
    if (valorDNI.length < 3 || !/^\d+$/.test(valorDNI)) {
        mostrarError("El DNI debe tener mínimo 3 dígitos y contener solo números.");
        return false;
    }
    return true;
};

// Función para validar el campo de texto con letras y máximo 40 caracteres
const validarCampoTexto = (campo, nombreCampo) => {
    const valorCampo = campo.value.trim();
    if (valorCampo === "") {
        mostrarError(`Debe ingresar un ${nombreCampo}.`);
        return false;
    }
    if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valorCampo)) {
        mostrarError(`${nombreCampo} debe contener solo letras y tener máximo 40 caracteres.`);
        return false;
    }
    return true;
};

// Función para validar el campo de texto opcional con letras y máximo 40 caracteres
const validarCampoTextoOpcional = (campo, nombreCampo) => {
    const valorCampo = campo.value.trim();
    if (valorCampo !== "" && !/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valorCampo)) {
        mostrarError(`${nombreCampo} debe contener solo letras y tener máximo 40 caracteres.`);
        return false;
    }
    return true;
};

// Función para validar el campo de dirección
const validarDireccion = () => {
    const valorDireccion = direccion.value.trim();
    if (valorDireccion === "") {
        mostrarError("Debe ingresar una dirección.");
        return false;
    }
    return true;
};

// Función para validar el campo de correo electrónico
const validarCorreo = () => {
    const valorCorreo = correo.value.trim();
    if (valorCorreo === "") {
        mostrarError("Debe ingresar un correo electrónico.");
        return false;
    }
    if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valorCorreo)) {
        mostrarError("El formato de correo electrónico es incorrecto.");
        return false;
    }
    return true;
};

// Función para validar el campo de teléfono
const validarTelefono = () => {
    const valorTelefono = telefono.value.trim();
    if (valorTelefono.length !== 10 || !/^\d+$/.test(valorTelefono)) {
        mostrarError("El teléfono debe tener 10 dígitos y contener solo números.");
        return false;
    }
    return true;
};

// Agrega eventos para la validación en vivo
dni.addEventListener("change", () => {
    if (validarDNI()) {
        actualizar.disabled = false;
    } else {
        actualizar.disabled = true;
    }
});

primerNombre.addEventListener("change", () => {
    if (validarCampoTexto(primerNombre, "primer nombre")) {
        actualizar.disabled = false;
    } else {
        actualizar.disabled = true;
    }
});

segundoNombre.addEventListener("change", () => {
    if (validarCampoTextoOpcional(segundoNombre, "segundo nombre")) {
        actualizar.disabled = false;
    } else {
        actualizar.disabled = true;
    }
});

primerApellido.addEventListener("change", () => {
    if (validarCampoTexto(primerApellido, "primer apellido")) {
        actualizar.disabled = false;
    } else {
        actualizar.disabled = true;
    }
});

segundoApellido.addEventListener("change", () => {
    if (validarCampoTextoOpcional(segundoApellido, "segundo apellido")) {
        actualizar.disabled = false;
    } else {
        actualizar.disabled = true;
    }
});

direccion.addEventListener("change", () => {
    if (validarDireccion()) {
        actualizar.disabled = false;
    } else {
        actualizar.disabled = true;
    }
});

correo.addEventListener("change", () => {
    if (validarCorreo()) {
        actualizar.disabled = false;
    } else {
        actualizar.disabled = true;
    }
});

telefono.addEventListener("change", () => {
    if (validarTelefono()) {
        actualizar.disabled = false;
    } else {
        actualizar.disabled = true;
    }
});




async function obtenerDatosSolicitud() {
    try {
        const url = window.location.pathname;
        // Dividir la URL en partes usando '/' como delimitador
        const partesURL = url.split('/');
        // El último elemento de la matriz será el valor del DNI
        const documento = partesURL[partesURL.length - 1];
         // Verificar el valor del DNI en la consola

        const response = await fetch(`/SolicitudPendiente${documento}`);
        const data = await response.json();
        
        if (!response.ok) {
            alert(data.message);
            window.location.href = "/SolitudesPendientes"
        } else{
            id.value=data.id_solicitud;
            id.disabled=true;
            dni.value = data.dni_persona;
            primerNombre.value = data.nombre_persona;
            segundoNombre.value = data.segundo_nombre_persona;
            primerApellido.value = data.apellido_persona;
            segundoApellido.value = data.segundo_apellido_persona;
            direccion.value = data.direccion_persona;
            telefono.value = data.telefono_persona;
            correo.value = data.correo_persona;
        }
        
    } catch (error) {
        console.error('Error al obtener datos de usuarios: ', error);
    }
}


actualizar.addEventListener("click",async function(){
    console.log('vamos bien');
})

eliminar.addEventListener("click",async function(){
    
    try {
        const idSolictud= parseInt(id.value);
        const response = await fetch(`/eliminarSolicitud/${idSolictud}`,{

            method:'DELETE'
        });
        
        if (response.ok) {
            const responseData = await response.json();
            alert(responseData.message); // Mostrar mensaje de éxito
            // Redirigir a la página de solicitudes pendientes u otra página deseada
            window.location.href = "/SolitudesPendientes";
        } else {
            // Si la eliminación no fue exitosa, mostrar un mensaje de error
            const errorData = await response.json();
            alert(errorData.message);
        }
    } 
    
    catch (error) {
        console.error('Error al eliminar la solicitud: ', error);
        
    }
    


})
