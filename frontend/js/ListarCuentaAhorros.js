const tbody = document.querySelector('#cuentaTable tbody');

document.addEventListener('DOMContentLoaded', () => {
    obtenerDatoscuenta();
  });
  
  async function obtenerDatoscuenta() {
    try{
      const response = await fetch('/listarCuentasAhorro');
      const cuentas = await response.json();
      agregarDatosATabla(cuentas);

        // Inicializar las tablas con DataTables y habilitar la ordenación
        $('#cuentaTable').DataTable({
          "paging": false, // Deshabilitar la paginación
          "searching": false, // Deshabilitar la búsqueda
          "info": false // Deshabilitar la información de la tabla
        });      
    } catch(error){
      console.error('Error al obtener datos de usuarios: ', error);
    }

  }
  
  function agregarDatosATabla(cuentas) {

    cuentas.forEach(cuenta => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
          <td>${cuenta.numero_cuenta}</td>
          <td>$ ${cuenta.saldo_cuenta}</td>
          <td>${cuenta.tasa_interes_cuenta} %</td>
          <td>${cuenta.aporte_mensual}</td>
          <td>${cuenta.dni_asociado}</td>
          <td>${cuenta.estado_cuenta ? 'Habilitada' : 'Deshabilitada'}</td>
          <td>${cuenta.detalles_estado_cuenta}</td>


          <td>
          <button class="btn btn-sm btn-primary" onclick="agregarAporte(${cuenta.agregarAporte})">
            <i class="bi bi-check"></i> Agregar Aporte
          </button>
          <button class="btn btn-sm btn-secondary" onclick="verAportes${cuenta.verAporte})">
            <i class="bi bi-eye"></i> Ver Aportes
          </button>
          </td>
        `;
        tbody.appendChild(fila);
    });
}