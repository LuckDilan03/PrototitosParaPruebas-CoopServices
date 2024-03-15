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
             document.getElementById('saldo-actual').textContent = '$' + data[0].saldo_cuenta;
             document.getElementById('abono-actual').textContent = '$' + data[0].monto_aporte;
             document.getElementById('aporte-mensual').textContent = '$' + data[0].aporte_mensual;
             document.getElementById('ahorro-total').textContent = '$' + data[0].numero_cuenta;
             document.getElementById('userName').textContent = data[0].nombre_persona +' '+data[0].apellido_persona;

    } catch (error) {
        console.error('Error al obtener los valores:', error);
        
    }


}




