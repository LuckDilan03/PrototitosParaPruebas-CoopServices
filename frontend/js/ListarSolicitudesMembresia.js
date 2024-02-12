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


  async function obtenerDatosSolicitud() {
    try{
      const response = await fetch('/listSolicitudMembresia');
      const solicitudes = await response.json();
      agregarDatosAaprobar(solicitudes);
      agregarDatosArevision(solicitudes);
      agregarDatosAdenegar(solicitudes);
    } catch(error){
      console.error('Error al obtener datos de usuarios: ', error);
    }
  }
  
  function agregarDatosAaprobar(solicitudes) {
    const tbody = document.querySelector('#aprobarTable tbody');

    solicitudes.forEach(solicitud => {
        const fila = document.createElement('tr');
        const fechasolicitud = new Date(solicitud.fecha_solicitud);
        const fechasolicitudform = `${fechasolicitud.getDate()}/${fechasolicitud.getMonth() + 1}/${fechasolicitud.getFullYear()}`;
        const fechaaprobacion = new Date(solicitud.fecha_aprobacion);
        const fechaaprobacionform = `${fechaaprobacion.getDate()}/${fechaaprobacion.getMonth() + 1}/${fechaaprobacion.getFullYear()}`;

        
        if (solicitud.respuesta_solicitud == 'APROBADA') {
            fila.innerHTML = `
                <td>${solicitud.id_solicitud}</td>
                <td>${solicitud.dni_persona}</td>
                <td>${solicitud.usuario_deseado}</td>
                <td>${fechasolicitudform}</td>
                <td><a href="./${solicitud.documento_solicitud}" target="_blank">Enlace al documento</a></td>
                <td>${solicitud.respuesta_solicitud}</td>
                <td class="fecha-aprobacion">${fechaaprobacionform}</td>
                <td class="numero-resolucion">${solicitud.numero_resolucion}</td>
                <td class="text-left">
                    <button class="btn btn-sm btn-primary" onclick="EditarSolicitud(${solicitud.id})">
                        <i class="bi bi-pencil"></i> Editar
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="denegarSolicitud(${solicitud.id})">
                        <i class="bi bi-x"></i> Denegar
                    </button>
                </td>
            `;
        }




        tbody.appendChild(fila);
    });
}

function agregarDatosArevision(solicitudes) {
    const tbody = document.querySelector('#revisionTable tbody');

    solicitudes.forEach(solicitud => {
        const fila = document.createElement('tr');
        const fechasolicitud = new Date(solicitud.fecha_solicitud);
        const fechasolicitudform = `${fechasolicitud.getDate()}/${fechasolicitud.getMonth() + 1}/${fechasolicitud.getFullYear()}`;
        const fechaaprobacion = new Date(solicitud.fecha_aprobacion);
        const fechaaprobacionform = `${fechaaprobacion.getDate()}/${fechaaprobacion.getMonth() + 1}/${fechaaprobacion.getFullYear()}`;

        
        if (solicitud.respuesta_solicitud == 'EN REVISION') {
            fila.innerHTML = `
                <td>${solicitud.id_solicitud}</td>
                <td>${solicitud.dni_persona}</td>
                <td>${solicitud.usuario_deseado}</td>
                <td>${fechasolicitudform}</td>
                <td><a href="./${solicitud.documento_solicitud}" target="_blank">Enlace al documento</a></td>
                <td>${solicitud.respuesta_solicitud}</td>

                <td class="text-left">
                    <button class="btn btn-sm btn-primary" onclick="aprobarSolicitud(${solicitud.id})">
                        <i class="bi bi-check"></i> Aprobar
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="denegarSolicitud(${solicitud.id})">
                        <i class="bi bi-x"></i> Denegar
                    </button>
                </td>
            `;
        }




        tbody.appendChild(fila);
    });
}

  
function agregarDatosAdenegar(solicitudes) {
    const tbody = document.querySelector('#denegarTable tbody');

    solicitudes.forEach(solicitud => {
        const fila = document.createElement('tr');
        const fechasolicitud = new Date(solicitud.fecha_solicitud);
        const fechasolicitudform = `${fechasolicitud.getDate()}/${fechasolicitud.getMonth() + 1}/${fechasolicitud.getFullYear()}`;
        const fechaaprobacion = new Date(solicitud.fecha_aprobacion);
        const fechaaprobacionform = `${fechaaprobacion.getDate()}/${fechaaprobacion.getMonth() + 1}/${fechaaprobacion.getFullYear()}`;

        
        if (solicitud.respuesta_solicitud == 'DENEGADA') {
            fila.innerHTML = `
                <td>${solicitud.id_solicitud}</td>
                <td>${solicitud.dni_persona}</td>
                <td>${solicitud.usuario_deseado}</td>
                <td>${fechasolicitudform}</td>
                <td><a href="./${solicitud.documento_solicitud}" target="_blank">Enlace al documento</a></td>
                <td>${solicitud.respuesta_solicitud}</td>
                <td class="fecha-aprobacion">${fechaaprobacionform}</td>
                <td class="numero-resolucion">${solicitud.numero_resolucion}</td>
                <td class="text-left">
                    <button class="btn btn-sm btn-primary" onclick="aprobarSolicitud(${solicitud.id})">
                        <i class="bi bi-pen"></i> Aprobar
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="denegarSolicitud(${solicitud.id})">
                        <i class="bi bi-x"></i> Denegar
                    </button>
                </td>
            `;
        }




        tbody.appendChild(fila);
    });
}

async function aprobarSolicitud(idSolicitud) {
    // Puedes utilizar una función que muestre un modal o un cuadro de diálogo para recopilar información adicional del usuario.
    const informacionAdicional = await solicitarInformacionAdicional();

    try {

        const response = await fetch(`/aprobarSolicitud`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idSolicitud: idSolicitud,
                informacionAdicional:{
                    saldoInicial:informacionAdicional.saldoInicial,
                    saldoAhorroVoluntario:informacionAdicional.saldoAhorroVoluntario
                },
                // Otros datos si es necesario
            }),
        });

        if (response.ok) {
            console.log('Solicitud aprobada con éxito');
            obtenerDatosSolicitud();
        } else {
            console.error('Error al aprobar la solicitud');
        }
    } catch (error) {
        console.error('Error en la solicitud de aprobación:', error);
    }
}



async function solicitarInformacionAdicional() {
    // Puedes utilizar un formulario modal o cualquier otro método para recopilar la información.
    // Aquí se muestra un ejemplo usando Bootstrap Modal.
    return new Promise((resolve) => {
        const modal = new bootstrap.Modal(document.getElementById('modalInformacionAdicional'));
        const btnGuardar = document.getElementById('btnGuardarModal');

        btnGuardar.addEventListener('click', () => {
            const saldoInicial = document.getElementById('saldoInicial').value;
            const saldoAhorroVoluntario = document.getElementById('saldoAhorroVoluntario').value;
            const esAdministrativo = document.getElementById('esAdministrativo').checked;

            const informacionAdicional = {
                saldoInicial,
                saldoAhorroVoluntario,
                esAdministrativo,
            };

            modal.hide();
            resolve(informacionAdicional);
        });

        modal.show();
    });
}


// Función de filtrado
$(document).ready(function() {
    // Evento de cambio en el selector de criterios de filtrado para la tabla de revisión
    $('#filterCriteriaRevision').on('change', function() {
        applyFilter($(this).val(), $('#searchInputRevision').val(), '#revisionTable');
    });

    // Evento de entrada de texto en el campo de búsqueda para la tabla de revisión
    $('#searchInputRevision').on('keyup', function() {
        applyFilter($('#filterCriteriaRevision').val(), $(this).val(), '#revisionTable');
    });

    // Evento de cambio en el selector de criterios de filtrado para la tabla de aprobación
    $('#filterCriteriaAprobacion').on('change', function() {
        applyFilter($(this).val(), $('#searchInputAprobacion').val(), '#aprobarTable');
    });

    // Evento de entrada de texto en el campo de búsqueda para la tabla de aprobación
    $('#searchInputAprobacion').on('keyup', function() {
        applyFilter($('#filterCriteriaAprobacion').val(), $(this).val(), '#aprobarTable');
    });

    // Evento de cambio en el selector de criterios de filtrado para la tabla de denegación
    $('#filterCriteriaDenegar').on('change', function() {
        applyFilter($(this).val(), $('#searchInputDenegar').val(), '#denegarTable');
    });

    // Evento de entrada de texto en el campo de búsqueda para la tabla de denegación
    $('#searchInputDenegar').on('keyup', function() {
        applyFilter($('#filterCriteriaDenegar').val(), $(this).val(), '#denegarTable');
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
        case 'id':
            return 0; // #ID Solicitud
        case 'dni':
            return 1; // DNI del Asociado
        case 'usuario':
            return 2; // Usuario deseado
        case 'fecha':
            return 3; // Fecha de solicitud
        case 'fechaAprobacion':
            return 6; // Fecha de aprobación
        case 'numeroResolucion':
            return 7; // Número de resolución
        default:
            return 0; // Valor predeterminado: no se aplica ningún filtro
    }
}
