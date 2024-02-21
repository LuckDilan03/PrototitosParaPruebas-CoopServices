document.addEventListener('DOMContentLoaded', () => {
  obtenerDatosUsuarios();
});

async function obtenerDatosUsuarios() {
  try {
      const response = await fetch('/listarUsuarioSistema');
      const usuarios = await response.json();
      agregarTarjetasDePerfil(usuarios);
  } catch (error) {
      console.error('Error al obtener datos de usuarios: ', error);
  }
}

function agregarTarjetasDePerfil(usuarios) {
  const profileContainer = document.getElementById('profileContainer');

  usuarios.forEach(usuario => {
      // Crea un elemento div para la tarjeta de perfil
      const card = document.createElement('div');
      card.classList.add('col-lg-4', 'col-md-6', 'mb-4');

      // HTML de la tarjeta de perfil
      card.innerHTML = `
        <div class="card-style">
          <div class="card">
              <button class="mail">
                  <i class="fa-regular fa-envelope"></i>
              </button>
              <div class="profile">
                  <img src="${usuario.imagen_perfil}" alt="imagen del Perfil">
              </div>
              <div class="content">
                  <div class="info">
                      <span class="name">${usuario.nombre_persona} ${usuario.apellido_persona}</span>
                      <span class="about">${usuario.direccion_persona}</span>
                  </div>
                  <div class="bottom">
                      <div class="social-links">
                          <a href="#">
                              <i class="fa-brands fa-instagram"></i>
                          </a>
                          <a href="#">
                              <i class="fa-brands fa-x-twitter"></i>
                          </a>
                          <a href="#">
                              <i class="fa-brands fa-github"></i>
                          </a>    
                      </div>
                      <button class="button">Contact Me</button>
                  </div>
              </div>
          </div>
        </div>
      `;

      // Agrega la tarjeta de perfil al contenedor
      profileContainer.appendChild(card);
  });
}
