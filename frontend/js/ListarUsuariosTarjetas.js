
 
 async function cambiarContra(usuario, dni) {
  const newPassword = prompt('Ingrese La nueva Contraseña');

  if (newPassword !== null) {
    const response = await fetch(`/actuliazarContra/${usuario}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        dni: dni,
        usuario: usuario,
        password: newPassword
      })
    });

    const resJson = await response.json();
    
    if (resJson.status==='error') {
      alert(resJson.message);
      window.location.href = "/dashboard";
    } else {
      alert(resJson.message);
      window.location.href = "/usuarioSistema";
    }
  }
}

const inputBusqueda = document.getElementById('inputBusqueda');

const filtrarUsuarios = (valorBusqueda) => {
  const tarjetas = document.querySelectorAll('.tarjeta');
  tarjetas.forEach(tarjeta => {
      const nombre = tarjeta.querySelector('p:nth-child(2)').textContent.toLowerCase();
      const apellido = tarjeta.querySelector('p:nth-child(3)').textContent.toLowerCase();
      const dni = tarjeta.querySelector('p:first-child').textContent.toLowerCase();
      if (nombre.includes(valorBusqueda) || dni.includes(valorBusqueda)||apellido.includes(valorBusqueda)) {
          tarjeta.style.display = 'block';
      } else {
          tarjeta.style.display = 'none';
      }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  obtenerDatosUsuarios();
  inputBusqueda.addEventListener('input', () => {
    filtrarUsuarios(inputBusqueda.value.toLowerCase());
  });
});

function calcularRol(id_rol) {
  return id_rol === 1 ? "ADMIN" : "ASOCIADO";
}

async function obtenerDatosUsuarios() {
  try{
      const response = await fetch('/listarUsuarioSistema');
      let usuarios = await response.json();
      
      usuarios.sort((a, b) => {
          return a.rol_ingreso - b.rol_ingreso;
      });

      agregarDatosATabla(usuarios);
  } catch(error){
      console.error('Error al obtener datos de usuarios: ', error);
  }
}

function agregarDatosATabla(usuarios) {
  const adminSection = document.getElementById('Tarjetas-admin');
  const asociadoSection = document.getElementById('Tarjetas-asociado');
  adminSection.innerHTML = '';
  asociadoSection.innerHTML = '';

  usuarios.forEach(usuario => {
      const tarjetaDiv = document.createElement('div');
      tarjetaDiv.classList.add('tarjeta');

      const rol = calcularRol(usuario.rol_ingreso);

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

      const buttonsDiv = crearBotonEditar(usuario, rol);
      tarjetaDiv.appendChild(buttonsDiv);

      if (rol === 'ADMIN') {
        adminSection.appendChild(tarjetaDiv);
      }
      else {
        asociadoSection.appendChild(tarjetaDiv);
      }
      const cambiarContraButton = document.getElementById(`cambiar-contra-${usuario.dni_persona}-${rol}`);
      cambiarContraButton.addEventListener('click', () => { cambiarContra(usuario.usuario_ingreso,usuario.dni_persona)
      
      
    });
  });
}

function crearBotonEditar(usuario, rol) {
  let buttonsHTML = `
    <button class="btn btn-sm btn-primary" id="cambiar-contra-${usuario.dni_persona}-${rol}">
      <i class="bi bi-pencil"></i> Cambiar contraseña
    </button>

    <button class="btn btn-sm btn-primary" id="habilitar-usuario-${usuario.dni_persona}  onclick="editarUsuario(${usuario.dni_persona})">
      <i class="bi bi-pencil"></i> Habilitar
    </button>
  `;
  
  if (rol === 'ADMIN') {
    buttonsHTML += `<button class="btn btn-sm btn-primary" id="boton-admin"  >
                      <i class="bi bi-pencil"></i> Crear Asociado
                    </button>`;
  }
  else {
    buttonsHTML += `<button class="btn btn-sm btn-primary" id="boton-admin" onclick="editarUsuario(${usuario.dni_persona})">
                      <i class="bi bi-pencil"></i> Crear Admin
                    </button>`;
  }

  buttonsHTML += `<button class="btn btn-sm btn-danger" onclick="suspenderUsuario(${usuario.dni_persona})">
                      <i class="bi bi-x"></i> Suspender
                    </button>`;

  const buttonsDiv = document.createElement('div');
  buttonsDiv.classList.add('buttons-container');
  buttonsDiv.innerHTML = buttonsHTML;

  return buttonsDiv;
}

