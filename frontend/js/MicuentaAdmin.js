document.addEventListener('DOMContentLoaded', () => {
    actulalizarDatos();


  // Agregar eventos para el filtro
  $('#filterCriteria').on('change', function() {
    applyFilter($(this).val(), $('#searchInput').val());
});

$('#searchInput').on('keyup', function() {
    applyFilter($('#filterCriteria').val(), $(this).val());
});
});


async function actulalizarDatos (){
    try {
        const response =await fetch('/datauser');
        const data=await response.json()
        console.log(data)
             // Actualizar los valores en el HTML

             document.getElementById('userName').textContent = data[0].nombre_persona +' '+data[0].apellido_persona;
             document.getElementById('userName1').textContent = data[0].nombre_persona +' '+data[0].apellido_persona;
             document.getElementById('userName2').textContent = data[0].usuario_deseado;
             document.getElementById('userRol').textContent = data[0].nombre_rol;

    } catch (error) {
        console.error('Error al obtener los valores:', error);
        
    }


}




