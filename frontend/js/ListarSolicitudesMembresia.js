document.addEventListener('DOMContentLoaded', () => {
    obtenerDatosSolicitud();
});

async function obtenerDatosSolicitud() {
    try {
        const response = await fetch('/listSolicitudMembresia');
        const solicitudes = await response.json();
        limpiarTablas(); // Limpia las tablas antes de agregar los nuevos datos
        agregarDatosAaprobar(solicitudes);
        agregarDatosArevision(solicitudes);
        agregarDatosAdenegar(solicitudes);

        // Inicializar las tablas con DataTables y habilitar la ordenación
        const tables = {
            revision: $('#revisionTable').DataTable({
                "lengthMenu": [[5, 10, 15, 20, 30], [5, 10, 15, 20, 30]],
                "pageLength": 5,
                "searching": true,
                "info": true,
                "select": true,
                "language": {
                    "lengthMenu": "Mostrar _MENU_ Registros Por Página",
                    "zeroRecords": "No Se Encontraron Registros",
                    "info": "Solicitudes Totales: _TOTAL_",
                    "infoEmpty": "No Hay Registros Disponibles",
                    "infoFiltered": "(Filtrado De _MAX_ Registros En Total)",
                    "search": "Buscar:",
                    "paginate": {
                        "previous": "Anterior",
                        "next": "Siguiente"
                    }
                }
            }),
            aprobacion: $('#aprobarTable').DataTable({
                "lengthMenu": [[5, 10, 15, 20, 30], [5, 10, 15, 20, 30]],
                "pageLength": 5,
                "searching": true,
                "info": true,
                "select": true,
                "language": {
                    "lengthMenu": "Mostrar _MENU_ Registros Por Página",
                    "zeroRecords": "No Se Encontraron Registros",
                    "info": "Solicitudes Totales: _TOTAL_",
                    "infoEmpty": "No Hay Registros Disponibles",
                    "infoFiltered": "(Filtrado De _MAX_ Registros En Total)",
                    "search": "Buscar:",
                    "paginate": {
                        "previous": "Anterior",
                        "next": "Siguiente"
                    }
                }
            }),
            denegar: $('#denegarTable').DataTable({
                "lengthMenu": [[5, 10, 15, 20, 30], [5, 10, 15, 20, 30]],
                "pageLength": 5,
                "searching": true,
                "info": true,
                "select": true,
                "language": {
                    "lengthMenu": "Mostrar _MENU_ Registros Por Página",
                    "zeroRecords": "No Se Encontraron Registros",
                    "info": "Solicitudes Totales: _TOTAL_",
                    "infoEmpty": "No Hay Registros Disponibles",
                    "infoFiltered": "(Filtrado De _MAX_ Registros En Total)",
                    "search": "Buscar:",
                    "paginate": {
                        "previous": "Anterior",
                        "next": "Siguiente"
                    }
                }
            })
        };

        // Agregar la función de búsqueda a los tres campos de búsqueda
        $('#searchInputRevision').on('keyup', function () {
            tables.revision.column($('#searchColumnRevision').val()).search(this.value).draw();
        });

        $('#searchInputAprobacion').on('keyup', function () {
            tables.aprobacion.column($('#searchColumnAprobacion').val()).search(this.value).draw();
        });

        $('#searchInputDenegar').on('keyup', function () {
            tables.denegar.column($('#searchColumnDenegar').val()).search(this.value).draw();
        });
    } catch (error) {
        console.error('Error al obtener las solicitudes:', error);
    }
}

function limpiarTablas() {
    const tablas = document.querySelectorAll('table tbody');
    tablas.forEach(tabla => {
        tabla.innerHTML = ''; // Elimina todo el contenido de la tabla
    });
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
                <td><a href="/uploads/${solicitud.documento_solicitud}" target="_blank">Enlace al documento</a></td>
                <td>${solicitud.respuesta_solicitud}</td>
                <td class="fecha-aprobacion">${fechaaprobacionform}</td>
                <td class="numero-resolucion">${solicitud.numero_resolucion}</td>
                <td class="text-left">
                    <button class="btn btn-sm btn-light" onclick="window.location.href='/SolicitudAprobada/${solicitud.dni_persona}'">
                    <i class="bi bi-user"></i> Ver Más
                    </button>
                </td>
            `;
            tbody.appendChild(fila);
        }
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
                <td><a href="/uploads/${solicitud.documento_solicitud}" target="_blank">Enlace al documento</a></td>
                <td>${solicitud.respuesta_solicitud}</td>
                <td class="text-left">
                    <button class="btn btn-sm btn-primary" onclick="aprobarSolicitud(${solicitud.id_solicitud},${solicitud.dni_persona})">
                        <i class="bi bi-check"></i> Aprobar
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="denegarSolicitud(${solicitud.id_solicitud},${solicitud.dni_persona})">
                        <i class="bi bi-x"></i> Denegar
                    </button>
                    <button class="btn btn-sm btn-light" onclick="window.location.href='/SolicitudPendiente/${solicitud.dni_persona}'">
                    <i class="bi bi-user"></i> Ver Más
                    </button>
                </td>
            `;
            tbody.appendChild(fila);
        }
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
                <td><a href="/uploads/${solicitud.documento_solicitud}" target="_blank">Enlace al documento</a></td>
                <td>${solicitud.respuesta_solicitud}</td>
                <td class="fecha-aprobacion">${fechaaprobacionform}</td>
                <td class="numero-resolucion">${solicitud.numero_resolucion}</td>
                <td class="text-left">
                    <button class="btn btn-sm btn-primary" onclick="aprobarSolicitud(${solicitud.id_solicitud},${solicitud.dni_persona})">
                        <i class="bi bi-pen"></i> Aprobar
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="denegarSolicitud(${solicitud.id_solicitud},${solicitud.dni_persona})">
                        <i class="bi bi-x"></i> Denegar
                    </button>
                    <button class="btn btn-sm btn-light" onclick="VerMas(${solicitud.dni_persona})">
                    <i class="bi bi-user"></i> Ver Más
                    </button>
                </td>
            `;
            tbody.appendChild(fila);
        }
    });
}

async function VerMasEnRevision(dni_persona) {
    try {
        const response = await fetch(`/SolicitudPendiente/${dni_persona}`);
        if (!response.ok) {
            throw new Error('No se pudo obtener la solicitud');
        }
        window.location.href = `/SolicitudPendiente/${dni_persona}`;
    } catch (error) {
        console.error('Error al obtener la solicitud:', error);
    }
}


async function denegarSolicitud(idSolicitud,dniDenegado){
    try {
        console.log('Denengando solicitud con ID:', idSolicitud);
        const informacionAdicional = await solicitarInformacionAdicionalDenegado(idSolicitud); // Pasar idSolicitud aquí
        console.log('Información adicional recopilada:', informacionAdicional);

        const bodyData = {
            dniDenegado:dniDenegado,
            idSolicitud: idSolicitud, // Asignar idSolicitud aquí
            informacionAdicional: informacionAdicional
        };

        console.log('Datos a enviar al servidor:', bodyData);

        const response = await fetch(`/DenegarSolicitud`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyData),
        });

        const resJson= await response.json();
        if (!response.ok) {
            alert(resJson.message);
            location.reload()
        } else{
            alert(resJson.message);
            window.location.href = "/SolitudesPendientes"
        }
    } catch (error) {
        console.error('Error en la solicitud de denegacion:', error);
    }
}


async function aprobarSolicitud(idSolicitud,dniAprobado) {
    try {
        console.log('Aprobando solicitud con ID:', idSolicitud);
        const informacionAdicional = await solicitarInformacionAdicional(idSolicitud); // Pasar idSolicitud aquí
        console.log('Información adicional recopilada:', informacionAdicional);

        const bodyData = {
            dniAprobado:dniAprobado,
            idSolicitud: idSolicitud, // Asignar idSolicitud aquí
            informacionAdicional: informacionAdicional
        };

        console.log('Datos a enviar al servidor:', bodyData);

        const response = await fetch(`/aprobarSolicitud`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyData),
        });

        const resJson= await response.json();
        if (!response.ok) {
            alert(resJson.message);
            location.reload()
        } else{
            alert(resJson.message);
            window.location.href = "/SolitudesPendientes"
        }
    } catch (error) {
        console.error('Error en la solicitud de aprobación:', error);
    }
}

async function limpiarModal() {
    document.getElementById('saldoInicial').value = '';
    document.getElementById('saldoAhorroVoluntario').value = '';
    document.getElementById('numeroResolucion').value = '';
    document.getElementById('esAdministrativo').checked = false;
}

async function solicitarInformacionAdicionalDenegado(idSolicitud) {
    // Abre el modal
    $('#modalInformacionAdicionalDenegado').modal('show');

    // Retorna una promesa que se resuelve con la información adicional cuando se hace clic en Guardar
    return new Promise((resolve, reject) => {
        $('#btnGuardarModalDenegado').one('click', () => {
            const informacionAdicional = {
                MotivoRechazo: document.getElementById('MotivoRechazo').value,
                numeroResolucion: document.getElementById('numeroResolucionRechazada').value,
                idSolicitud: idSolicitud,
                
            };

            // Cierra el modal
            $('#modalInformacionAdicionalDenegado').modal('hide');

            // Limpia el contenido del modal
            //limpiarModal();

            // Resuelve la promesa con la información adicional
            resolve(informacionAdicional);
        });
    });
}

async function solicitarInformacionAdicional(idSolicitud) {
    // Abre el modal
    $('#modalInformacionAdicional').modal('show');

    // Retorna una promesa que se resuelve con la información adicional cuando se hace clic en Guardar
    return new Promise((resolve, reject) => {
        $('#btnGuardarModal').one('click', () => {
            const informacionAdicional = {
                saldoInicial: document.getElementById('saldoInicial').value,
                saldoAhorroVoluntario: document.getElementById('saldoAhorroVoluntario').value,
                numeroResolucion: document.getElementById('numeroResolucion').value,
                esAdministrativo: document.getElementById('esAdministrativo').checked,
                idSolicitud: idSolicitud
            };

            // Cierra el modal
            $('#modalInformacionAdicional').modal('hide');

            // Limpia el contenido del modal
            //limpiarModal();

            // Resuelve la promesa con la información adicional
            resolve(informacionAdicional);
        });
    });
}

