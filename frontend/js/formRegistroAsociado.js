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
/*evento que verifica el campo dni y activa el boton*/
dni.addEventListener("change",function (){

    if (!/^\d+$/.test(dni.value) ) {
        alert("El DNI debe contener solo números.");
        actualizar.disabled = true;
        return;}
    

    actualizar.disabled=false;
    })
/*evento que verifica el campo primer nombre y activa el boton*/
primerNombre.addEventListener("change",function (){
    
    if(primerNombre.value===""){
        alert("Debe ingresar un primer nombre");
        actualizar.disabled = true;
        return;}

    actualizar.disabled=false;})

/*evento que verifica el campo segundo nombre y activa el boton*/ 
segundoNombre.addEventListener("change",function (){
    
    if(segundoNombre.value===""){
        alert("Debe ingresar un segundo Nombre");
        actualizar.disabled = true;
        return;}
    
    actualizar.disabled=false;})
/*evento que verifica el campo primer apellido y activa el boton*/ 
primerApellido.addEventListener("change",function (){
    
    if(primerApellido.value===""){
        alert("Debe ingresar un primer Apellido");
        actualizar.disabled = true;
        return;}
    
    
    actualizar.disabled=false;})
/*evento que verifica el campo segundo apellido y activa el boton*/ 
segundoApellido.addEventListener("change",function (){
    
    if(segundoApellido.value===""){
        alert("Debe ingresar un segundo Apellido");
        actualizar.disabled = true;
        return;}

    
    actualizar.disabled=false;})
/*evento que verifica el direccion  y activa el boton*/ 
direccion.addEventListener("change",function (){
    
    if(direccion.value===""){
        alert("Debe ingresar una direccion");
        actualizar.disabled = true;
        return;}
    
    actualizar.disabled=false;})
/*evento que verifica el campo telefono y activa el boton*/ 
telefono.addEventListener("change",function (){
    
    
    if (!/^\d+$/.test(telefono.value) ) {
        alert("El telefono debe contener solo números.");
        actualizar.disabled = true;
        return;}
    
    actualizar.disabled=false;})
/*evento que verifica el campo correo y activa el boton*/ 
correo.addEventListener("change",function (){
    
    if(correo.value===""){
        alert("Debe ingresar un correo");
        actualizar.disabled = true;
        return;}
    
    actualizar.disabled=false;})




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
