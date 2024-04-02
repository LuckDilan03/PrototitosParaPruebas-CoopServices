async function activarUsuario(event, usuario, dni) {
  event.stopPropagation();
  
  const response = await fetch(`/activarUsuario/${usuario}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ dni: dni }),
  });
  const resJson = await response.json();
  if (resJson.status === "error") {
    alert(resJson.message);
    window.location.href = "/dashboard";
  } else {
    alert(resJson.message);
    window.location.href = "/usuarioSistema";
  }
}



async function suspenderUsuario(event, usuario, dni) {
  event.stopPropagation();
  
  const response = await fetch(`/suspederUsuario/${usuario}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ dni: dni }),
  });
  const resJson = await response.json();
  if (resJson.status === "error") {
    alert(resJson.message);
    window.location.href = "/dashboard";
  } else {
    alert(resJson.message);
    window.location.href = "/usuarioSistema";
  }
}

async function cambiarContra(usuario, dni) {
  
  const newPassword = prompt("Ingrese La nueva Contraseña");

  if (newPassword !== null) {
    const response = await fetch(`/actuliazarContra/${usuario}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dni: dni,
        usuario: usuario,
        password: newPassword,
      }),
    });

    const resJson = await response.json();

    if (resJson.status === "error") {
      alert(resJson.message);
      window.location.href = "/dashboard";
    } else {
      alert(resJson.message);
      window.location.href = "/usuarioSistema";
    }
  }
}

const inputBusqueda = document.getElementById("inputBusqueda");
const seleccionAdmin = document.getElementById("selectorAdmin");
const seleccionUsuario = document.getElementById("selectorUsuario");

const filtrarUsuarios = (valorBusqueda) => {
  const tarjetas = document.querySelectorAll(".tarjeta");
  tarjetas.forEach((tarjeta) => {
    const nombre = tarjeta.querySelector("p:nth-child(3)").textContent.toLowerCase();
    const apellido = tarjeta.querySelector("p:nth-child(4)").textContent.toLowerCase();
    const dni = tarjeta.querySelector("p:nth-child(2)").textContent.toLowerCase();
    if (nombre.includes(valorBusqueda) || dni.includes(valorBusqueda) || apellido.includes(valorBusqueda)) {
      tarjeta.style.display = "block";
    } else {
      tarjeta.style.display = "none";
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  obtenerDatosUsuarios();
  inputBusqueda.addEventListener("input", () => {
    filtrarUsuarios(inputBusqueda.value.toLowerCase());
  });
});

function calcularRol(id_rol) {
  return id_rol === 1 ? "ADMIN" : "ASOCIADO";
}

function calcularEstado(estado) {
  return estado ? "ACTIVO" : "SUSPENDIDO";
}

async function obtenerDatosUsuarios() {
  try {
    const response = await fetch("/listarUsuarioSistema");
    let usuarios = await response.json();

    usuarios.sort((a, b) => {
      return a.rol_ingreso - b.rol_ingreso;
    });

    agregarDatosATabla(usuarios);
  } catch (error) {
    console.error("Error al obtener datos de usuarios: ", error);
  }
}

function agregarDatosATabla(usuarios) {
 const adminSection = document.getElementById("Tarjetas-admin");
  const asociadoSection = document.getElementById("Tarjetas-asociado");
  adminSection.innerHTML = "";
  asociadoSection.innerHTML = "";
  const tituloTarjeta = document.createElement("h2");
  tituloTarjeta.classList.add("titulo-admin");
  tituloTarjeta.innerHTML = "Administradores";
  const tituloTarjetaAsociados = document.createElement("h2");
  tituloTarjetaAsociados.classList.add("titulo-asociado");
  tituloTarjetaAsociados.innerHTML = "Asociados";
  adminSection.appendChild(tituloTarjeta);
  asociadoSection.appendChild(tituloTarjetaAsociados);

  usuarios.forEach((usuario) => {
    const tarjetaDiv = document.createElement("div");

    tarjetaDiv.classList.add("tarjeta");

    const rol = calcularRol(usuario.rol_ingreso);

    tarjetaDiv.innerHTML = `
          <img class="rounded-circle me-lg-2" src="/uploads/fotoPerfil/${usuario.foto_persona}" alt="" style="width: 100px; height: 100px;">
          <p>DNI: ${usuario.dni_persona}</p>
          <p>Nombre: ${usuario.nombre_persona}</p>
          <p>Apellido: ${usuario.apellido_persona}</p>
          <p>Dirección: ${usuario.direccion_persona}</p>
          <p>Teléfono: ${usuario.telefono_persona}</p>
          <p>Correo: ${usuario.correo_persona}</p>
          <p>Usuario: ${usuario.usuario_ingreso}</p>
          <p>Rol: ${rol}</p>
          <img id="imagen" class="rounded-circle me-lg-2 imagen-estado" src="/images/aprobado.jpg" alt="" style="width: 70px; height: 70px;">
          <textContent> ultimos detalles: ${usuario.detalle_estado} </textContent>
      `;

    const buttonsDiv = crearBotonEditar(usuario, rol);
    tarjetaDiv.appendChild(buttonsDiv);
    const imagenEstado = tarjetaDiv.querySelector(".imagen-estado");
    const botonSuspender = tarjetaDiv.querySelector(".btn.btn-sm.btn-danger");
    const botonHabilitar = tarjetaDiv.querySelector(".Habilitar");

    if (usuario.estado_usuario) {
      imagenEstado.src = "/images/aprobado.png";

      botonHabilitar.style.display = "none";
    } else {
      imagenEstado.src = "/images/denegado.png";
      botonSuspender.style.display = "none";
    }

    if (rol === "ADMIN") {
      adminSection.appendChild(tarjetaDiv);
    } else {
      asociadoSection.appendChild(tarjetaDiv);
    }

    const cambiarContraButton = document.getElementById(`cambiar-contra-${usuario.dni_persona}-${rol}`);
    cambiarContraButton.addEventListener("click", () => {
      cambiarContra(usuario.usuario_ingreso, usuario.dni_persona);
    });

    const suspenderUsuarioButton = document.getElementById(`boton-suspender-${usuario.dni_persona}-${rol}`);
    suspenderUsuarioButton.addEventListener("click", (event) => {
      suspenderUsuario(event, usuario.usuario_ingreso, usuario.dni_persona);
    });

    const activarUsuarioButton = document.getElementById(`habilitar-usuario-${usuario.dni_persona}-${rol}`);
    activarUsuarioButton.addEventListener("click", (event) => {
      activarUsuario(event, usuario.usuario_ingreso, usuario.dni_persona);
    });

  });

  seleccionAdmin.addEventListener("click", () => {
    if (seleccionAdmin.classList.contains("seleccionado")) {seleccionAdmin.classList.remove("seleccionado");
      adminSection.style.display = "none";
    } else {
      seleccionAdmin.classList.add("seleccionado");
      adminSection.style.display = "";
    }
  });

  seleccionUsuario.addEventListener("click", () => {
    if (seleccionUsuario.classList.contains("seleccionado")) {
      seleccionUsuario.classList.remove("seleccionado");
      asociadoSection.style.display = "none";
    } else {
      seleccionUsuario.classList.add("seleccionado");
      asociadoSection.style.display = "";
    }
  });
}

function crearBotonEditar(usuario, rol) {
  let buttonsHTML = `
    <button class="btn btn-sm btn-primary" id="cambiar-contra-${usuario.dni_persona}-${rol}">
      <i class="bi bi-pencil"></i> Cambiar contraseña
    </button>

    <button class="btn btn-sm btn-primary Habilitar" id="habilitar-usuario-${usuario.dni_persona}-${rol}">
      <i class="bi bi-pencil"></i> Habilitar
    </button>
  `;

  if (rol === "ADMIN") {
    buttonsHTML += `<button class="btn btn-sm btn-primary" id="boton-Asociado"  >
                      <i class="bi bi-pencil"></i> Crear Asociado
                    </button>`;
  } else {
    buttonsHTML += `<button class="btn btn-sm btn-primary" id="boton-admin" >
                      <i class="bi bi-pencil"></i> Crear Admin
                    </button>`;
  }

  buttonsHTML += `<button class="btn btn-sm btn-danger" id="boton-suspender-${usuario.dni_persona}-${rol}">
                      <i class="bi bi-x"></i> Suspender
                  </button>`;

  const buttonsDiv = document.createElement("div");
  buttonsDiv.classList.add("buttons-container");
  buttonsDiv.innerHTML = buttonsHTML;

  return buttonsDiv;
}