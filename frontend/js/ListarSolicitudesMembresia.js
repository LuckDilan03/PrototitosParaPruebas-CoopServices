document.addEventListener('DOMContentLoaded', () => {
    obtenerDatosSolicitud();
  });
  
  async function obtenerDatosSolicitud() {
    try{
      const response = await fetch('/listSolicitudMembresia');
      const solicitudes = await response.json();
      agregarDatosATabla(solicitudes);
    } catch(error){
      console.error('Error al obtener datos de usuarios: ', error);
    }
  }
  
  function agregarDatosATabla(solicitudes) {
    const tbody = document.querySelector('#solicitudTable tbody');

    solicitudes.forEach(solicitud => {
        const fila = document.createElement('tr');
        const fechasolicitud = new Date(solicitud.fecha_solicitud);
        const fechasolicitudform = `${fechasolicitud.getDate()}/${fechasolicitud.getMonth() + 1}/${fechasolicitud.getFullYear()}`;

        fila.innerHTML = `
            <td>${solicitud.id_solicitud}</td>
            <td>${solicitud.dni_persona}</td>
            <td>${solicitud.usuario_deseado}</td>
            <td>${fechasolicitudform}</td>
            <td><a href="./${solicitud.documento_solicitud}" target="_blank">Enlace al documento</a></td>
            <td>${solicitud.respuesta_solicitud}</td>
        `;

        if (solicitud.respuesta_solicitud !== 'EN REVISION') {
            const fechaaprobacion = new Date(solicitud.fecha_aprobacion);
            const fechaaprobacionform = `${fechaaprobacion.getDate()}/${fechaaprobacion.getMonth() + 1}/${fechaaprobacion.getFullYear()}`;

            fila.innerHTML += `
                <td class="fecha-aprobacion">${fechaaprobacionform}</td>
                <td class="numero-resolucion">${solicitud.numero_resolucion}</td>
                <td class="text-left">
                    <button class="btn btn-sm btn-primary" onclick="aprobarSolicitud(${solicitud.id})">
                        <i class="bi bi-check"></i> Aprobar
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="denegarSolicitud(${solicitud.id})">
                        <i class="bi bi-x"></i> Denegar
                    </button>
                </td>
            `;
        } else {
            fila.innerHTML += `
                <td class="fecha-aprobacion"></td>
                <td class="numero-resolucion"></td>
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