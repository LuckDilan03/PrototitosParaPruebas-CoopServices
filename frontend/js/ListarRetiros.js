const tbody = document.querySelector('#retirosTable tbody');

document.addEventListener('DOMContentLoaded', () => {
    obtenerDatosretiros();
  });
  
  async function obtenerDatosretiros() {
    try{
      const response = await fetch('/listarRetiros');
      const retiros = await response.json();
      agregarDatosATabla(retiros);

        // Inicializar las tablas con DataTables y habilitar la ordenación
        $('#retirosTable').DataTable({
          "paging": false, // Deshabilitar la paginación
          "searching": false, // Deshabilitar la búsqueda
          "info": false // Deshabilitar la información de la tabla
        });      
    } catch(error){
      console.error('Error al obtener datos de usuarios: ', error);
    }

  }
  
  function agregarDatosATabla(retiros) {

    retiros.forEach(retiro => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${retiro.id_retiro}</td>
            <td>${retiro.numero_cuenta}</td>
            <td>${retiro.monto_retirado}</td>
            <td>${retiro.fecha_retiro}</td>
            // <td>${retiro.comprobante_retiro}</td>
            // <td>${retiro.estado_retiro}</td>
            // <td>${retiro.detalles_estado_retiro}</td>

        //     <td>
        //     <button class="btn btn-sm btn-primary" onclick="aceptarretiro(${retiro.id})">
        //       <i class="bi bi-check"></i> Aceptar
        //     </button>
        //     <button class="btn btn-sm btn-danger" onclick="denegarretiro(${retiro.id})">
        //       <i class="bi bi-x"></i> Denegar
        //     </button>
        //   </td>
        `;
        tbody.appendChild(fila);
    });
}