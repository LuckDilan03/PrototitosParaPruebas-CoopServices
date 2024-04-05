const tbody = document.querySelector('#aportesTable tbody');

document.addEventListener('DOMContentLoaded', () => {
    obtenerDatosaporte();
  });
  
  async function obtenerDatosaporte() {
    try{
      const response = await fetch('/listarAportes');
      const aportes = await response.json();
      agregarDatosATabla(aportes);

        // Inicializar las tablas con DataTables y habilitar la ordenación
        $('#aportesTable').DataTable({
          "paging": false, // Deshabilitar la paginación
          "searching": false, // Deshabilitar la búsqueda
          "info": false // Deshabilitar la información de la tabla
        });      
    } catch(error){
      console.error('Error al obtener datos de usuarios: ', error);
    }

  }
  
  function agregarDatosATabla(aportes) {

    aportes.forEach(aporte => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${aporte.id_aporte}</td>
            <td>${aporte.numero_aporte}</td>
            <td>${aporte.numero_cuenta}</td>
            <td>${aporte.monto_aporte}</td>
            <td>${aporte.fecha_aporte}</td>
            <td>${aporte.tipo_aporte}</td>
            <td>${aporte.comprobante_aporte}</td>
            <td>${aporte.estado_aporte}</td>
            <td>${aporte.detalles_estado_aporte}</td>

        //     <td>
        //     <button class="btn btn-sm btn-primary" onclick="aceptaraporte(${aporte.id})">
        //       <i class="bi bi-check"></i> Aceptar
        //     </button>
        //     <button class="btn btn-sm btn-danger" onclick="denegaraporte(${aporte.id})">
        //       <i class="bi bi-x"></i> Denegar
        //     </button>
        //   </td>
        `;
        tbody.appendChild(fila);
    });
}