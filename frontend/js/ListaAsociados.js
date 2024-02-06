document.addEventListener('DOMContentLoaded', () => {
    obtenerDatosAsociados();
});

async function obtenerDatosAsociados() {
    try{
      const response = await fetch('/listAsociados');
      const asociados = await response.json();
      agregarDatosATabla(asociados);
    } catch (error){
      console.error('Error al obtener datos del asociado: ', error);
    }
}

function agregarDatosATabla(asociados) {
  const tbody = document.querySelector('#asociadosTable tbody');

  asociados.forEach(asociado => {
    const fila = document.createElement('tr');
    const fechaIngreso = new Date(asociado.fecha_ingreso_asociado);
    const fechaFormateada =  `${fechaIngreso.getDate()}/${fechaIngreso.getMonth() + 1}/${fechaIngreso.getFullYear()}`;
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