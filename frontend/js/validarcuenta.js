
document.addEventListener('DOMContentLoaded', function () {
    fetch(`/obtenerNombrePersona/${userId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error al obtener el nombre de la persona');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Nombre de la persona:', data.nombre);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});
