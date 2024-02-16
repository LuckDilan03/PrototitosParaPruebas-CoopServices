document.addEventListener('DOMContentLoaded', () => {
    obtenerDatosSolicitud();
  });
  
  async function obtenerDatosSolicitud() {
    try{
      const response = await fetch('/listarSolicitudesPrestamo');
      const solicitudes = await response.json();
      agregarDatosATabla(solicitudes);

        // Inicializar las tablas con DataTables y habilitar la ordenación
        $('#solicitudTable').DataTable({
          "paging": false, // Deshabilitar la paginación
          "searching": false, // Deshabilitar la búsqueda
          "info": false // Deshabilitar la información de la tabla
        });      
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
            <button class="btn btn-sm btn-primary" onclick="aceptarsolicitud(${solicitud.id})">
              <i class="bi bi-check"></i> Aceptar
            </button>
            <button class="btn btn-sm btn-danger" onclick="denegarsolicitud(${solicitud.id})">
              <i class="bi bi-x"></i> Denegar
            </button>
          </td>
        `;
        tbody.appendChild(fila);
    });
}