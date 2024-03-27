document.addEventListener('DOMContentLoaded', () => {
    obtenerDatosUsuarios();
  });

  function calcularRol(id_rol) {
    return id_rol === 1 ? "ADMIN" : "ASOCIADO";
  }

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
    tarjetasSection.innerHTML = ''; // Limpiar el contenedor antes de agregar las tarjetas

    usuarios.forEach(usuario => {
        const rol = calcularRol(usuario.rol_ingreso);

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
            <p>Rol: ${rol}</p>
        `;

        const buttonsDiv = document.createElement('div'); // Crear un div para los botones
        buttonsDiv.classList.add('buttons-container'); // Agregar una clase para estilizar el contenedor de botones

        // Crear los botones y agregarlos al contenedor
        const buttonsHTML = 
        `
            <button class="btn btn-sm btn-primary" onclick="editarUsuario(${usuario.id})">
                <i class="bi bi-pencil"></i> Crear Admin
            </button> 
            <button class="btn btn-sm btn-primary" onclick="editarUsuario(${usuario.id})">
                <i class="bi bi-pencil"></i> Cambiar contraseña
            </button> 

            <button class="btn btn-sm btn-primary" onclick="editarUsuario(${usuario.id})">
                <i class="bi bi-pencil"></i> Habilitar
            </button>

            <button class="btn btn-sm btn-danger" onclick="suspenderUsuario(${usuario.id})">
                <i class="bi bi-x"></i> Suspender
            </button>
        `;
        buttonsDiv.innerHTML = buttonsHTML;

        // Agregar el contenedor de botones a la tarjeta
        tarjetaDiv.appendChild(buttonsDiv);

        tarjetasSection.appendChild(tarjetaDiv); // Agregar la tarjeta al contenedor
    });
}
