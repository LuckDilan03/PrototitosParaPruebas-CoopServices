document.getElementById("formulario-login").addEventListener("submit", async (e) => {
  e.preventDefault();

  const user = document.getElementById('Usuario').value; // Accede directamente al campo de entrada del usuario
  const pass = document.getElementById('Contrasena').value; // Accede directamente al campo de entrada de contraseña
  
  const response = await fetch("/login",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({user,pass})
  });
  
  const resJson= await response.json();
    if (!response.ok) {
        alert(resJson.message);
    } else{
        alert(resJson.message);
        window.location.href = "/dashboard"
    }
});

const pass = document.getElementById('Contrasena');
const eyeIcon = document.getElementById('eye-icon');
const eyeOffIcon = document.getElementById('eye-off-icon');

eyeIcon.addEventListener("click", togglePasswordVisibility);
eyeOffIcon.addEventListener("click", togglePasswordVisibility);

function togglePasswordVisibility() {
    if (pass.type === "password") {
        pass.type = "text";
        eyeIcon.style.display = "none";
        eyeOffIcon.style.display = "block";
    } else {
        pass.type = "password";
        eyeIcon.style.display = "block";
        eyeOffIcon.style.display = "none";
    }
}
