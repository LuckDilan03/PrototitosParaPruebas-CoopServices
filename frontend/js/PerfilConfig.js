document.addEventListener('DOMContentLoaded', () => {
    obtenerDatosUsuario();
});

const dni = document.getElementById('DniAsociado');
const primerNombre = document.getElementById('PrimerNombre');
const segundoNombre = document.getElementById('SegundoNombre');
const primerApellido = document.getElementById('PrimerApellido');
const segundoApellido = document.getElementById('SegundoApellido');
const direccion = document.getElementById('Direccion');
const telefono = document.getElementById('Telefono');
const correo = document.getElementById('CorreoElectronico');
const actualizar = document.getElementById('Actualizar');
const volver = document.getElementById('Volver');

// Función para mostrar alerta de error
const mostrarError = (mensaje) => {
    alert(mensaje);
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
direccion.addEventListener("change", () => {
    if (validarDireccion()) {
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

async function obtenerDatosUsuario() {
    try {
        // Aquí deberías decodificar el token JWT para obtener la información del usuario
        // Supongamos que el token está almacenado en localStorage
        const token = localStorage.getItem('jwt');
        const decodedToken = jwt_decode(token);

        // Extraer el DNI del usuario del token decodificado
        const dniUsuario = decodedToken.dni;

        // Ahora puedes hacer una solicitud al servidor para obtener los datos del usuario usando el DNI
        const response = await fetch(`/obtenerDatosUsuario/${dniUsuario}`);
        const data = await response.json();
        
        if (!response.ok) {
            alert(data.message);
            window.location.href = "/";
        } else {
            id.value = data.id_solicitud;
            id.disabled = true;
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

actualizar.addEventListener("click", async function(){
    // Aquí puedes agregar la lógica para actualizar los datos del usuario
    console.log('Datos actualizados');
});

eliminar.addEventListener("click", async function(){
    // Aquí puedes agregar la lógica para eliminar el usuario
    console.log('Usuario eliminado');
});
