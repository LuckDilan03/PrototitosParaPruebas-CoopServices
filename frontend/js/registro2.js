// Escuchar el evento de cambio en el campo de archivo
const mensaje=document.getElementsByClassName('error')[0];

const fileInput = document.getElementById('Soporte_Documento');
fileInput.addEventListener('change', updateFileInputUI);

//funcion para el cambio por el nombre del archivo
function updateFileInputUI() {
    const fileInput = document.getElementById('Soporte_Documento');
    const fileLabel = document.querySelector('.file-label');
    

    if (fileInput.files.length > 0) {
        // Si se selecciona un archivo, mostrar el nombre del archivo seleccionado
        fileLabel.textContent = fileInput.files[0].name;
        
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
        formData.append('Soporte_Documento', fileInput.files[0]);
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

const pass=document.getElementById('Contrasena')
const icon=document.querySelector('.bx');

    icon.addEventListener("click",e=>{
    
        if(pass.type==="password"){
        pass.type="text";
    }else{
        pass.type="password"
    }


})

