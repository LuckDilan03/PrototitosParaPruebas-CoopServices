document.addEventListener('DOMContentLoaded', () => {
    obtenerDatosSolicitud();
  });
  
  async function obtenerDatosSolicitud() {
    try{
      const response = await fetch('/listSolicitudPrestamo');
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
        fila.innerHTML = `
            <td>${solicitud.id_solicitud_prestamo}</td>
            <td>${solicitud.dni_responsable_prestamo}</td>
            <td>${solicitud.monto_solicita_prestamo}</td>
            <td>${solicitud.ingreso_solicita_prestamo}</td>
            <td>${solicitud.tipo_prestamo}"</td>
            <td>${solicitud.requisitos_solicitud_prestamo}</td>
            <td>${solicitud.dni_fiador_prestamo}</td>
            <td>${solicitud.dni_coofiador_prestamo}</td>

            <td>
            <button class="btn btn-sm btn-primary" onclick="aceptarsolicitud(${asociado.id})">
              <i class="bi bi-check"></i> Aceptar
            </button>
            <button class="btn btn-sm btn-danger" onclick="denegarsolicitud(${asociado.id})">
              <i class="bi bi-x"></i> Denegar
            </button>
          </td>
        `;
        tbody.appendChild(fila);
    });
}