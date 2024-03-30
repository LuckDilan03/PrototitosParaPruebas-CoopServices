

addEventListener('DOMContentLoaded',()=>{
    const nuevaContra=document.getElementById('NuevaContrasena');
    const confirmacionContra=document.getElementById('VerificarContrasena');
    const enviar=document.getElementById('enviar');

    const url = new URL(window.location.href);
    const pathname = url.pathname;
    const token = pathname.split('/')[2];
    

    enviar.addEventListener('click',async ()=>{

        const valorNuevaContra=nuevaContra.value;
        const valorConfirmacionContra=confirmacionContra.value;
        if(valorNuevaContra===valorConfirmacionContra){
            const response =  await fetch(`/recuperarContra2`,{

                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    token:token,
                    valorConfirmacionContra:valorConfirmacionContra
                })
            })
            const resJson=await response.json();
            console.log(resJson.status)
            if (resJson.status==='error') {
                alert(resJson.message);
                window.location.href = "/recuperarContra";
            } else {
                alert(resJson.message);
                window.location.href = "/iniciarSesion";
            }
        }
        else{

        }
    })




})

