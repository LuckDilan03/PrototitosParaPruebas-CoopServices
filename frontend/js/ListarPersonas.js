document.addEventListener('DOMContentLoaded', () => {
  obtenerDatosPersonas();

  // Agregar eventos para el filtro
  $('#filterCriteria').on('change', function() {
      applyFilter($(this).val(), $('#searchInputPersona').val(), '#personasTable');
  });

  $('#searchInputPersona').on('keyup', function() {
      applyFilter($('#filterCriteria').val(), $(this).val(), '#personasTable');
  });
});

async function obtenerDatosPersonas() {
    try{
      const response = await fetch('/listarPersonas');
      const personas = await response.json();
      agregarDatosATabla(personas);

        // Inicializar las tablas con DataTables y habilitar la ordenación
        $('#personasTable').DataTable({
          "lengthMenu": [[5, 10, 15, 20, 30], [5, 10, 15, 20, 30]],
          "pageLength": 5,
          "searching": false, // Deshabilitar la búsqueda
          "info": true, // Habilitar la información de la tabla
          "language": {
              "lengthMenu": "Mostrar _MENU_ Registros Por Página",
              "zeroRecords": "No Se Encontraron Personas",
              "info": "Personas Totales: _TOTAL_",
              "infoEmpty": "No Hay Registros Disponibles",
              "infoFiltered": "(Filtrado De _MAX_ Personas En Total)",
              "search": "Buscar:",
              "paginate": {
                  "previous": "Anterior",
                  "next": "Siguiente"
              }
          }
      });
    } catch (error){
      console.error('Error al obtener datos del asociado: ', error);
    }
}

function agregarDatosATabla(personas) {
  const tbody = document.querySelector('#personasTable tbody');

  personas.forEach(persona => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
    <td>${persona.dni_persona}</td>
    <td>${persona.nombre_persona}</td>
    <td>${persona.segundo_nombre_persona || '-'}</td>
    <td>${persona.apellido_persona}</td>
    <td>${persona.segundo_apellido_persona || '-'}</td>
    <td>${persona.direccion_persona}</td>
    <td>${persona.telefono_persona}</td>
    <td>${persona.correo_persona}</td>
    <td>${persona.nombre_rol || '-'}</td>
    <td>${persona.documento_persona}</td>

    `;
    tbody.appendChild(fila);
  });
}

// Función de filtrado
$(document).ready(function() {
  // Evento de cambio en el selector de criterios de filtrado para la tabla de revisión
  $('#filterCriteriaPersona').on('change', function() {
      applyFilter($(this).val(), $('#searchInputPersona').val(), '#personasTable');
  });

  // Evento de entrada de texto en el campo de búsqueda para la tabla de revisión
  $('#filterCriteriaPersona').on('keyup', function() {
      applyFilter($('#searchInputPersona').val(), $(this).val(), '#personasTable');
  });

});

// Función de filtrado
function applyFilter(criteria, searchTerm, tableId) {
  // Convertir el término de búsqueda a minúsculas para hacer la comparación de manera insensible a mayúsculas
  searchTerm = searchTerm.toLowerCase();

  // Filtrar la tabla en función del criterio seleccionado
  $(`${tableId} tbody tr`).each(function() {
      var rowData = $(this).find('td:nth-child(' + (getColumnIndex(criteria) + 1) + ')').text().toLowerCase();
      if (rowData.indexOf(searchTerm) === -1) {
          $(this).hide();
      } else {
          $(this).show();
      }
  });
}

// Función para obtener el índice de columna según el criterio de filtrado
function getColumnIndex(criteria) {
  // Devuelve el índice de columna basado en el criterio seleccionado
  switch (criteria) {
      case 'dni':
          return 0;
      case 'primerNombre':
          return 1;
      case 'segundoNombre':
          return 2;
      case 'primerApellido':
          return 3;
      case 'segundoApellido':  
          return 4;
      case 'direccion':
          return 5;
      case 'telefono':  
          return 6;
      case 'correo':  
          return 7;
      case 'rol': 
          return 8;
      case 'documento': 
          return 9;
  }
}