// Suponiendo que tienes una función fetchUserInfo() que obtiene la información del usuario del backend
function fetchUserInfo() {
    fetch('InfoUsuario')
    .then(response => response.json())
    .then(data => {
        // Actualizar el nombre del usuario y la imagen del avatar
        document.getElementById('userName').textContent = data.name;
        document.getElementById('userAvatar').src = data.avatarUrl;
    })
    .catch(error => {
        console.error('Error al obtener la información del usuario:', error);
    });
}

