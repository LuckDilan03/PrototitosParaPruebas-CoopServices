// Obtén una referencia al elemento <div> con el id "alert"
const alertDiv = document.getElementById("alert");

// Función para mostrar el mensaje de error
function mostrarError() {
    alertDiv.classList.remove("d-none"); // Remueve la clase "d-none" para mostrar el elemento
}

// Función para ocultar el mensaje de error
function ocultarError() {
    alertDiv.classList.add("d-none"); // Agrega la clase "d-none" para ocultar el elemento
}

// Lógica para mostrar u ocultar el mensaje de error según corresponda
function validarCredenciales() {
    const usuario = document.getElementById("Usuario").value;
    const clave = document.getElementById("Clave").value;

    if (usuario === "" || clave === "") {
        mostrarError();
    } else {
        ocultarError();
        // Aquí puedes agregar la lógica para enviar los datos del formulario al servidor
    }
}

// Asigna la función validarCredenciales al evento "submit" del formulario
function submitForm(event) {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente
    validarCredenciales();
}