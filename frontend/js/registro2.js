// Escuchar el evento de cambio en el campo de archivo
const mensaje=document.getElementsByClassName('error')[0];

const fileInput = document.getElementById('Soporte_Documento');
fileInput.addEventListener('change', updateFileInputUI);

//funcion para el cambio por el nombre del archivo
function updateFileInputUI() {
    const fileInput = document.getElementById('Soporte_Documento');
    const fileLabel = document.querySelector('.file-label');
    

    if (fileInput.files.length > 0) {
        // Si se selecciona un archivo, mostrar solo el nombre del archivo (sin la ruta completa)
        const fileName = fileInput.files[0].name;
        fileLabel.textContent = fileName;
        
    } else {
        // Si no se selecciona ningún archivo, mostrar el texto predeterminado y ocultar el nombre del archivo
        fileLabel.textContent = 'Documento de identidad';
        
    }
}

//seleccion del formulario para el post 
document.getElementById("formulario-registro").addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('Documento', e.target.elements.Documento.value);
    formData.append('Primer_Nombre', e.target.elements.Primer_Nombre.value);
    formData.append('Segundo_Nombre', e.target.elements.Segundo_Nombre.value);
    formData.append('Primer_Apellido', e.target.elements.Primer_Apellido.value);
    formData.append('Segundo_Apellido', e.target.elements.Segundo_Apellido.value);
    formData.append('Direccion', e.target.elements.Direccion.value);
    formData.append('Telefono', e.target.elements.Telefono.value);
    formData.append('Correo_Electronico', e.target.elements.Correo_Electronico.value);
    
    const fileInput = document.getElementById('Soporte_Documento');
    if (fileInput.files.length > 0) {
        // Obtener solo el nombre del archivo sin la ruta completa
        const fileName = fileInput.files[0].name;
        formData.append('Soporte_Documento', fileInput.files[0], fileName);
    }

    formData.append('Contrasena', e.target.elements.Contrasena.value);

    const response = await fetch("/register", {
        method: "POST",
        body: formData
    });
    const resJson= await response.json();
    if (!response.ok) {
        alert(resJson.message);
    } else{
        alert(resJson.message);
        window.location.href = "/"
    }
    // Maneja la respuesta del servidor
});

const pass = document.getElementById('Contrasena');
const eyeIcon = document.getElementById('eye-icon');
const eyeOffIcon = document.getElementById('eye-off-icon');

eyeIcon.addEventListener("click", togglePasswordVisibility);
eyeOffIcon.addEventListener("click", togglePasswordVisibility);

function togglePasswordVisibility() {
    if (pass.type === "password") {
        pass.type = "text";
        eyeIcon.style.display = "none";
        eyeOffIcon.style.display = "block";
    } else {
        pass.type = "password";
        eyeIcon.style.display = "block";
        eyeOffIcon.style.display = "none";
    }
}
document.addEventListener('keydown', function(event) {
    // Verifica si la tecla presionada es la tecla Tab
    if (event.key === 'Tab') {
        // Evita el comportamiento predeterminado del navegador (mover el foco hacia el siguiente elemento)
        event.preventDefault();

        // Define el orden deseado de los campos de entrada
        var fieldOrder = ['Documento', 'Primer_Nombre', 'Segundo_Nombre', 'Primer_Apellido', 'Segundo_Apellido', 'Telefono', 'Direccion', 'Correo_Electronico', 'Contrasena'];

        // Encuentra el índice del campo de entrada actualmente enfocado en el orden deseado
        var currentIndex = fieldOrder.indexOf(document.activeElement.id);

        // Calcula el índice del próximo campo de entrada en el orden deseado
        var nextIndex = currentIndex + 1;

        // Si el próximo índice está fuera de los límites, establece el enfoque en el primer campo de entrada
        if (nextIndex >= fieldOrder.length) {
            nextIndex = 0;
        }

        // Establece el foco en el próximo campo de entrada en el orden deseado
        document.getElementById(fieldOrder[nextIndex]).focus();
    }
});
