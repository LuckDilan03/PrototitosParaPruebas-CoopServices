$(document).ready(function(){
  $('#birth-date').mask('00/00/0000');
  $('#Telefono_persona').mask('+00 000 0000000');

  // Función para validar la contraseña
  function validarContrasena(contrasena) {
    var expresionRegular = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return expresionRegular.test(contrasena);
  }

  // Evento para validar la contraseña cuando se hace clic en el botón "Enviar Formulario"
  $('.create-account').click(function() {
    var contrasena = $('#contraseña_deseada').val();
    if (!validarContrasena(contrasena)) {
      var mensaje = "La contraseña debe cumplir los siguientes criterios:\n";
      mensaje += "- Al menos una letra minúscula\n";
      mensaje += "- Al menos una letra mayúscula\n";
      mensaje += "- Al menos un dígito\n";
      mensaje += "- Longitud mínima de 8 caracteres";
      
      alert(mensaje);
      return false; // Evita que el formulario se envíe si la contraseña es inválida
    }
  });
});
