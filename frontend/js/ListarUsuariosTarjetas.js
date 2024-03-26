document.addEventListener('DOMContentLoaded', () => {
    obtenerDatosUsuarios();
  });
  
  async function obtenerDatosUsuarios() {
    try{
      const response = await fetch('/listarUsuarioSistema');
      const usuarios = await response.json();
      agregarDatosATabla(usuarios);
    } catch(error){
      console.error('Error al obtener datos de usuarios: ', error);
    }
  }
  
  function agregarDatosATabla(usuarios) {
    const tarjetasSection = document.getElementById('Tarjetas');

    usuarios.forEach(usuario => {
        const tarjetaDiv = document.createElement('div'); // Crear un div para cada tarjeta
        tarjetaDiv.classList.add('tarjeta'); // Agregar una clase para estilizar la tarjeta

        tarjetaDiv.innerHTML = `
            <p>DNI: ${usuario.dni_persona}</p>
            <p>Nombre: ${usuario.nombre_persona}</p>
            <p>Apellido: ${usuario.apellido_persona}</p>
            <p>Dirección: ${usuario.direccion_persona}</p>
            <p>Teléfono: ${usuario.telefono_persona}</p>
            <p>Correo: ${usuario.correo_persona}</p>
            <p>Usuario: ${usuario.usuario_ingreso}</p>
            <button class="btn btn-sm btn-primary" onclick="editarUsuario(${usuario.id})">
                <i class="bi bi-pencil"></i> Editar
            </button>
            <button class="btn btn-sm btn-danger" onclick="suspenderUsuario(${usuario.id})">
                <i class="bi bi-x"></i> Suspender
            </button>
        `;

        tarjetasSection.appendChild(tarjetaDiv); // Agregar la tarjeta al contenedor
    });
}