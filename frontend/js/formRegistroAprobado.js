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
const FechaAprobacion=document.getElementById('FechaAprobacion');
FechaAprobacion.disabled=true;
const NumeroCuenta=document.getElementById('NumeroCuenta');
NumeroCuenta.disabled=true;
const SaldoCuenta =document.getElementById('SaldoCuenta');
SaldoCuenta.disabled=true;
const Estado=document.getElementById('Estado');
Estado.disabled=true;

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
        const documento = partesURL[partesURL.length - 1];
         // Verificar el valor del DNI en la consola

        const response = await fetch(`/SolicitudAprobada${documento}`);
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
            const fecha = new Date(data.fecha_aprobacion);
            FechaAprobacion.value = fecha.toISOString().split('T')[0];
            NumeroCuenta.value=parseFloat(data.numero_cuenta);
            SaldoCuenta.value=parseFloat(data.saldo_cuenta);
            if(!data.estado_cuenta || data.estado_cuenta===null ){
                Estado.value='SUSPENDIDA';
            }
            else{Estado.value='ACTIVA';}
            if(data.usuario_deseado.includes("AD")){
                const numero=0;
                NumeroCuenta.value=numero;
                SaldoCuenta.value=0
                Estado.value="Perfil ADMIN"

            }
            


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


