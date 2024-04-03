const fileInputPerfil=document.getElementById('fileInputPerfil');
const fotoPerfilPersona=document.getElementById('fotoConfiguracion');
const btnCambiarFoto=document.getElementById('CambiarFoto');
const formDNIAsociado=document.getElementById('DniAsociado');
const formPrimerNombre=document.getElementById('PrimerNombre');
const formSegundoNombre=document.getElementById('SegundoNombre');
const formPrimerApellido=document.getElementById('PrimerApellido');
const formSegundoApellido=document.getElementById('SegundoApellido');
const formDireccionPersona=document.getElementById('Direccion');
const formTelefonoPersona=document.getElementById('Telefono');
const btnActualizarDatos=document.getElementById('Actualizar')

addEventListener('DOMContentLoaded',()=>{
    optenerDataPerfil()
    eventosPerfil ()
    
})

async function optenerDataPerfil(){
    try {
        const response=await fetch('/dataperfil');
        const data=await response.json()
        const calcularRol  = () => {
            if (data.datosUsuario.rol === 1) {
                return 'ADMIN';
            } else {
                return 'ASOCIADO';
            }
        };
        const rolMostrar=calcularRol();
        
        fotoPerfilPersona.src=`/uploads/fotoPerfil/${data.datosPersona.foto_persona}`;
        formDNIAsociado.value=data.datosUsuario.dni
        formPrimerNombre.value=data.datosPersona.nombre_persona
        formSegundoNombre.value=data.datosPersona.segundo_nombre_persona
        formPrimerApellido.value=data.datosPersona.apellido_persona
        formSegundoApellido.value=data.datosPersona.segundo_apellido_persona
        formDireccionPersona.value=data.datosPersona.direccion_persona
        formTelefonoPersona.value=data.datosPersona.telefono_persona
    } 
    
    catch (error) {
        console.error('Error al obtener los valores:', error);
        
    }
        
}

function eventosPerfil (){
    fotoPerfilPersona.addEventListener('click',()=>{
        fileInputPerfil.click()
    })

    fileInputPerfil.addEventListener('change', () => {
        const file = fileInputPerfil.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                // Mostrar la imagen temporal en el centro de la pantalla
                fotoPerfilPersona.src = e.target.result;
                
            };
            reader.readAsDataURL(file);
        }
    });

    formDireccionPersona.addEventListener('change',()=>{
        btnActualizarDatos.disabled=false;
    })
    formTelefonoPersona.addEventListener('change',()=>{
        btnActualizarDatos.disabled=false;
    })

    btnCambiarFoto.addEventListener('click', async () => {
        // Verificar si se ha seleccionado un archivo
        if (fileInputPerfil.files.length > 0) {
            // Copiar la imagen seleccionada a la imagen principal
            const formData = new FormData();
            const fileName = fileInputPerfil.files[0].name;
            formData.append('fotoLateral', fileInputPerfil.files[0], fileName);
    
            const response = await fetch("/cambiarFotoLateral", {
                method: "PUT",
                body: formData
            });
    
            const resJson = await response.json();
            if (!response.ok) {
                alert(resJson.message);
                window.location.href = "/dashboard"
            } else {
                alert(resJson.message);
                window.location.href = "/perfil"
            }
        } else {
            // Mostrar un mensaje indicando que no se ha seleccionado ninguna foto
            alert("Por favor, selecciona una foto antes de intentar cambiarla.");
        }
    });




}
    
