document.addEventListener('DOMContentLoaded', () => {
    const dni = document.getElementById('dni');
    const usuario = document.getElementById('Usuario');
    const enviar = document.getElementById('boton-enviar');
  
    enviar.addEventListener('click', async () => {
        
      const documento=dni.value
      const usuarioValue = usuario.value.trim();
      
      if (usuarioValue === '') {
        alert('El campo Usuario está vacío');
        return;
      }
     
      
      

      const response = await fetch(`/recuperarContra1/${usuarioValue}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body:JSON.stringify({documento})
        
      });

        const resJson=await response.json();
        
        console.log(resJson.status)
        if (resJson.status==='error') {
            alert(resJson.message);
            window.location.href = "/recuperarContra";
          } else {
            alert(resJson.message);
            window.location.href = "/iniciarSesion";
          }
    })
    

})