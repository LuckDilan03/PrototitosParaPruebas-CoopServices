document.addEventListener('DOMContentLoaded', () => {
  obtenerDatosUsuarios();
});

async function obtenerDatosUsuarios() {
  try{
    const response = await fetch('/listUsers');
    const usuarios = await response.json();
    agregarDatosATabla(usuarios);
  } catch(error){
    console.error('Error al obtener datos de usuarios: ', error);
  }
}

function agregarDatosATabla(usuarios) {
  const tbody = document.querySelector('#usuariosTable tbody');

  usuarios.forEach(usuario => {
    const fila = document.createElement('tr'); 
    fila.innerHTML = `
    <td>${usuario.dni_persona}</td>
    <td>${usuario.nombre_persona}</td>
    <td>${usuario.apellido_persona}</td>
    <td>${usuario.direccion_persona}</td>
    <td>${usuario.telefono_persona}</td>
    <td>${usuario.correo_persona}</td>
    <td>${usuario.usuario_ingreso}</td>
    <td>${usuario.rol_ingreso}</td>
    `;
    tbody.appendChild(fila);
  });
}