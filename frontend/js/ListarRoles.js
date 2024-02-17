document.addEventListener('DOMContentLoaded', () => {
    obtenerDatosSolicitud();
  });
  
  async function obtenerDatosSolicitud() {
    try{
      const response = await fetch('/listarRoles');
      const solicitudes = await response.json();
      agregarDatosATabla(solicitudes);

        // Inicializar las tablas con DataTables y habilitar la ordenación
        $('#rolesTable').DataTable({
          "paging": false, // Deshabilitar la paginación
          "searching": false, // Deshabilitar la búsqueda
          "info": false // Deshabilitar la información de la tabla
        });      
    } catch(error){
      console.error('Error al obtener datos de usuarios: ', error);
    }
  }
  
  function agregarDatosATabla(solicitudes) {
    const tbody = document.querySelector('#rolesTable tbody');

    solicitudes.forEach(solicitud => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${solicitud.id_Rol}</td>
            <td>${solicitud.Nombre_Rol}</td>
            <td>${solicitud.Labores_Rol}</td>
            <td>${solicitud.Permisos_Rol}</td>

            

            <td>
            <button class="btn btn-sm btn-primary" onclick="editarrol(${solicitud.id})">
              <i class="bi bi-check"></i> Aceptar
            </button>
            <button class="btn btn-sm btn-danger" onclick="eliminarrol(${solicitud.id})">
              <i class="bi bi-x"></i> Denegar
            </button>
          </td>
        `;
        tbody.appendChild(fila);
    });
}