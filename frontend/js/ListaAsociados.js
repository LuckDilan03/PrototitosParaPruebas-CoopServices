document.addEventListener('DOMContentLoaded', () => {
    obtenerDatosAsociados();
});

async function obtenerDatosAsociados() {
    try {
        const response = await fetch('/listarAsociados');
        const asociados = await response.json();
        agregarDatosATabla(asociados);

        // Inicializar las tablas con DataTables y habilitar la ordenación, búsqueda y paginación
        const table = $('#asociadosTable').DataTable({
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
        $('#searchColumnAsociados').on('change', function() {
            const columnIndex = $(this).val(); // Obtener el índice de la columna seleccionada
            const searchTerm = $('#searchInputAsociados').val(); // Obtener el término de búsqueda
            table.column(columnIndex).search(searchTerm).draw(); // Aplicar el filtro en la columna seleccionada y redibujar la tabla
        });

        // Agregar evento de entrada al campo de búsqueda
        $('#searchInputAsociados').on('input', function() {
            const columnIndex = $('#searchColumnAsociados').val(); // Obtener el índice de la columna seleccionada
            const searchTerm = $(this).val(); // Obtener el término de búsqueda
            table.column(columnIndex).search(searchTerm).draw(); // Aplicar el filtro en la columna seleccionada y redibujar la tabla
        });
    } catch (error) {
        console.error('Error al obtener datos del asociado: ', error);
    }
}

function agregarDatosATabla(asociados) {
    const tbody = document.querySelector('#asociadosTable tbody');

    asociados.forEach(asociado => {
        const fila = document.createElement('tr');
        const fechaIngreso = new Date(asociado.fecha_ingreso_asociado);
        const fechaFormateada = `${fechaIngreso.getDate()}/${fechaIngreso.getMonth() + 1}/${fechaIngreso.getFullYear()}`;
        fila.innerHTML = `
            <td>${asociado.dni_asociado}</td>
            <td>${asociado.usuario_ingreso}</td>
            <td>${fechaFormateada}</td>
            <td>${asociado.estado_del_asociado}</td>
            <td>${asociado.detalle_estado}</td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="editarasociado(${asociado.id})">
                    <i class="bi bi-pencil"></i> Editar
                </button>
                <button class="btn btn-sm btn-danger" onclick="suspenderasociado(${asociado.id})">
                    <i class="bi bi-x"></i> Suspender
                </button>
            </td>
        `;
        tbody.appendChild(fila);
    });
}
