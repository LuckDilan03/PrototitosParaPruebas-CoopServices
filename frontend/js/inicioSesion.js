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
        window.location.href = "/admin"
    }
});


const pass=document.getElementById('Contrasena')
const icon=document.querySelector('.bx');

    icon.addEventListener("click",e=>{
    
        if(pass.type==="password"){
        pass.type="text";
    }else{
        pass.type="password"
    }


})