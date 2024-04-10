const tbody = document.querySelector('#cuentaTable tbody');

document.addEventListener('DOMContentLoaded', () => {
    obtenerDatoscuenta();
  });
  
  async function obtenerDatoscuenta() {
    try{
      const response = await fetch('/listarCuentasAhorro');
      const cuentas = await response.json();
      agregarDatosATabla(cuentas);

        // Inicializar las tablas con DataTables y habilitar la ordenación
        const table = $('#cuentaTable').DataTable({
          "lengthMenu": [[5, 10, 15, 20, 30], [5, 10, 15, 20, 30]],
          "pageLength": 5,
          "searching": true,
          "info": true,
          "select": true,
          "language": {
              "lengthMenu": "Mostrar _MENU_ Asociados Por Página",
              "zeroRecords": "No Se Encontraron Asociados",
              "info": "Asociados Totales: _TOTAL_",
              "infoEmpty": "No Hay Asociados Disponibles",
              "infoFiltered": "(Filtrado De _MAX_ Asociados En Total)",
              "search": "Buscar:",
              "paginate": {
                  "previous": "Anterior",
                  "next": "Siguiente"
              }
          }
      });

      // Agregar evento de cambio al elemento select
      $('#searchColumnCuenta').on('change', function() {
          const columnIndex = $(this).val(); // Obtener el índice de la columna seleccionada
          const searchTerm = $('#searchInputCuenta').val(); // Obtener el término de búsqueda
          table.column(columnIndex).search(searchTerm).draw(); // Aplicar el filtro en la columna seleccionada y redibujar la tabla
      });

      // Agregar evento de entrada al campo de búsqueda
      $('#searchInputCuenta').on('input', function() {
          const columnIndex = $('#searchColumnCuenta').val(); // Obtener el índice de la columna seleccionada
          const searchTerm = $(this).val(); // Obtener el término de búsqueda
          table.column(columnIndex).search(searchTerm).draw(); // Aplicar el filtro en la columna seleccionada y redibujar la tabla
      });
    } catch(error){
      console.error('Error al obtener datos de usuarios: ', error);
    }

  }
  
  function agregarDatosATabla(cuentas) {

    cuentas.forEach(cuenta => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
          <td>${cuenta.numero_cuenta}</td>
          <td>$ ${cuenta.saldo_cuenta}</td>
          <td>${cuenta.tasa_interes_cuenta} %</td>
          <td>${cuenta.aporte_mensual}</td>
          <td>${cuenta.dni_asociado}</td>
          <td>${cuenta.estado_cuenta ? 'Habilitada' : 'Deshabilitada'}</td>
          <td>${cuenta.detalles_estado_cuenta}</td>


          <td>
          <button class="btn btn-sm btn-primary" onclick="agregarAporte(${cuenta.agregarAporte})">
            <i class="bi bi-check"></i> Agregar Aporte
          </button>
          <button class="btn btn-sm btn-secondary" onclick="verAportes${cuenta.verAporte})">
            <i class="bi bi-eye"></i> Ver Aportes
          </button>
          </td>
        `;
        tbody.appendChild(fila);
    });
}