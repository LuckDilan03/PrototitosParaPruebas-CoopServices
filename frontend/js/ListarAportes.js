const tbody = document.querySelector('#aportesTable tbody');

document.addEventListener('DOMContentLoaded', () => {
    obtenerDatosaporte();
  });
  
  async function obtenerDatosaporte() {
    try{
      const response = await fetch('/listarAportesRegistrados');
      const aportes = await response.json();
      agregarDatosATabla(aportes);

        // Inicializar las tablas con DataTables y habilitar la ordenación
        const table = $('#aportesTable').DataTable({
          "lengthMenu": [[15, 20, 35, 40, 50], [15, 20, 35, 40, 50]],
          "pageLength": 15,
          "searching": true,
          "info": true,
          "select": true,
          "language": {
              "lengthMenu": "Mostrar _MENU_ Aportes Por Página",
              "zeroRecords": "No Se Encontraron Aportes",
              "info": "Aportes Totales: _TOTAL_",
              "infoEmpty": "No Hay Aportes Disponibles",
              "infoFiltered": "(Filtrado De _MAX_ Aportes En Total)",
              "search": "Buscar:",
              "paginate": {
                  "previous": "Anterior",
                  "next": "Siguiente"
              }
          }
      });

      // Agregar evento de cambio al elemento select
      $('#searchColumnAportes').on('change', function() {
          const columnIndex = $(this).val(); // Obtener el índice de la columna seleccionada
          const searchTerm = $('#searchInputAportes').val(); // Obtener el término de búsqueda
          table.column(columnIndex).search(searchTerm).draw(); // Aplicar el filtro en la columna seleccionada y redibujar la tabla
      });

      // Agregar evento de entrada al campo de búsqueda
      $('#searchInputAportes').on('input', function() {
          const columnIndex = $('#searchColumnAportes').val(); // Obtener el índice de la columna seleccionada
          const searchTerm = $(this).val(); // Obtener el término de búsqueda
          table.column(columnIndex).search(searchTerm).draw(); // Aplicar el filtro en la columna seleccionada y redibujar la tabla
      });
    } catch(error){
      console.error('Error al obtener datos de usuarios: ', error);
    }

  }
  
  function agregarDatosATabla(aportes) {

    aportes.forEach(aporte => {
      const fecha_aporte = new Date(aporte.fecha_aporte);
      const fecha_aporte_formato = `${fecha_aporte.getDate()}/${fecha_aporte.getMonth() + 1}/${fecha_aporte.getFullYear()}`;
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${aporte.id_aporte}</td>
            <td>${aporte.numero_cuenta}</td>
            <td>${aporte.monto_aporte}</td>
            <td>${fecha_aporte_formato}</td>
            <td>${aporte.tipo_aporte}</td>
            <td>${aporte.comprobante_aporte}</td>
            <td>${aporte.estado_aporte}</td>
            <td>${aporte.detalles_estado_aporte}</td>
<!--
            <td>
             <button class="btn btn-sm btn-primary" onclick="aceptaraporte(${aporte.id})">
               <i class="bi bi-check"></i> Aceptar
            </button>
           <button class="btn btn-sm btn-danger" onclick="denegaraporte(${aporte.id})">
               <i class="bi bi-x"></i> Denegar
             </button>
           </td> -->
        `;
        tbody.appendChild(fila);
    });
}