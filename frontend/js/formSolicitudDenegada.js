document.addEventListener('DOMContentLoaded', () => {
    obtenerDatosSolicitud();
});


const id=document.getElementById('idSolicitud');
id.disabled=true;
const dni=document.getElementById('DniAsociado');
dni.disabled=true;
const primerNombre=document.getElementById('PrimerNombre');
primerNombre.disabled=true;
const segundoNombre=document.getElementById('SegundoNombre');
segundoNombre.disabled=true;
const primerApellido=document.getElementById('PrimerApellido');
primerApellido.disabled=true;
const segundoApellido=document.getElementById('SegundoApellido');
segundoApellido.disabled=true;
const direccion=document.getElementById('Direccion');
direccion.disabled=true;
const telefono =document.getElementById('Telefono');
telefono.disabled=true;
const correo=document.getElementById('CorreoElectronico');
correo.disabled=true;
const FechaSolicitud=document.getElementById('FechaSolicitud');
FechaSolicitud.disabled=true;
const DocumentoPresentado = document.getElementById('DocumentoPresentado');
DocumentoPresentado.disabled = true;
const RespuestaSolicitud =document.getElementById('RespuestaSolicitud');
RespuestaSolicitud.disabled=true;
const FechaRespuesta=document.getElementById('FechaRespuesta');
FechaRespuesta.disabled=true;
const numeroResolucion=document.getElementById('numeroResolucion');
numeroResolucion.disabled=true;
const DetalleRespuesta=document.getElementById('DetalleRespuesta');
DetalleRespuesta.disabled=true;

const Habilitar=document.getElementById('Habilitar');
const Suspender=document.getElementById('Suspender');
const volver=document.getElementById('Volver');
// Función para mostrar alerta de error
const mostrarError = (mensaje) => {
    alert(mensaje);
};





async function obtenerDatosSolicitud() {
    try {
        const url = window.location.pathname;
        // Dividir la URL en partes usando '/' como delimitador
        const partesURL = url.split('/');
        // El último elemento de la matriz será el valor del DNI
        const id_pag = partesURL[partesURL.length - 2];
        const documento = partesURL[partesURL.length - 1]
         // Verificar el valor del DNI en la consola
        console.log(documento)
        const response = await fetch(`/DataSolicitudDenegada/${id_pag}/${documento}`);
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
            const fechasolic = new Date(data.fecha_solicitud);
            FechaSolicitud.value = fechasolic.toISOString().split('T')[0];
            DocumentoPresentado.value = `${data.documento_solicitud}`;
            RespuestaSolicitud.value = data.respuesta_solicitud;
            const fechares = new Date(data.fecha_aprobacion);
            FechaRespuesta.value = fechares.toISOString().split('T')[0];
            numeroResolucion.value = data.numero_resolucion;
            DetalleRespuesta.value = data.detalle_solicitud;


        }
        
    } catch (error) {
        console.error('Error al obtener datos de usuarios: ', error);
    }
}

Suspender.addEventListener("click",async function(){
    
    try {
        const idSolictud= parseInt(id.value);
        const response = await fetch(`/suspenderAsociadoManualmente/${idSolictud}`,{

            method:'PUT'
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

Habilitar.addEventListener("click",async function(){
    
    try {
        const idSolictud= parseInt(id.value);
        const response = await fetch(`/habilitarAsociadoManualmente/${idSolictud}`,{

            method:'PUT'
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


