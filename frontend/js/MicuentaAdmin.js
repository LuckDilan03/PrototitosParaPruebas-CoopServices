const userName=document.getElementById('userName') || { textContent: 'Valor predeterminado' };
const userName1=document.getElementById('userName1');
const userName2=document.getElementById('userName2');
const userRol=document.getElementById('userRol');
const fotoDashboardHamburguesa=document.getElementById('fotoDashboardHamburguesa');
const imagenDashboardSuperior=document.getElementById('imagenDashboardSuperior');
const cantidadCuentas = document.getElementById('cantidad-cuentas') || { textContent: 'Valor predeterminado' };
const totalSaldos = document.getElementById('total-saldos') || { textContent: 'Valor predeterminado' };
const promedioRecaudo = document.getElementById('promedio-recaudo') || { textContent: 'Valor predeterminado' };
const totalAportes = document.getElementById('total-aportes') || { textContent: 'Valor predeterminado' };
const fileInput = document.getElementById('fileInput');
const imagenTemporal = document.getElementById('imagenTemporal');
const imagenTemporalSrc = document.getElementById('imagenTemporalSrc');
const btnAceptar = document.getElementById('btnAceptar');
const btnCancelar = document.getElementById('btnCancelar');









document.addEventListener('DOMContentLoaded', () => {
    actulalizarDatos();
    eventos()


  

    


});

function sumatoriaAportes(aportes){
    let sumaAportes=0;
    for(const aporte of aportes){
        valorAporte=parseInt(aporte.monto_aporte)
        
        sumaAportes+=valorAporte;
    }
    
    return sumaAportes;
}

function eventos(){

    fotoDashboardHamburguesa.addEventListener('click', () => {
        fileInput.click(); // Al hacer clic en la imagen, activa el clic en el input de archivo
    });

    // Evento change para el input de archivo
    fileInput.addEventListener('change', () => {
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                // Mostrar la imagen temporal en el centro de la pantalla
                imagenTemporalSrc.src = e.target.result;
                imagenTemporal.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });

        // Evento de clic en el botón "Aceptar" para confirmar la selección
    btnAceptar.addEventListener('click', async () => {
        // Ocultar la imagen temporal
        imagenTemporal.style.display = 'none';
        // Copiar la imagen seleccionada a la imagen principal
        const formData = new FormData();
            if (fileInput.files.length > 0) {
                // Obtener solo el nombre del archivo sin la ruta completa
                const fileName = fileInput.files[0].name;
                formData.append('fotoLateral', fileInput.files[0], fileName);
            }

            const response = await fetch("/cambiarFotoLateral", {
                method: "PUT",
                body: formData
            });
            const resJson= await response.json();
            if (!response.ok) {
                alert(resJson.message);
                window.location.href = "/dashboard"
            } else{
                alert(resJson.message);
                window.location.href = "/dashboard"
                
            }
                });

    //Evento de clic en el boton "Cancelar" para cancerlar la accion de subida de archivos

    btnCancelar.addEventListener('click', () => {
        // Ocultar la imagen temporal
        imagenTemporal.style.display = 'none';
    });

    imagenDashboardSuperior.addEventListener('mouseover', function() {
        // Aumentar el tamaño de la imagen cuando se coloque el cursor sobre ella
        this.style.transform = 'scale(2) translateY(10px)'; // Escala al 110% del tamaño original
    });
    
    imagenDashboardSuperior.addEventListener('mouseout', function() {
        // Restaurar el tamaño original de la imagen cuando se quite el cursor
        this.style.transform = 'scale(1) translateY(0) '; // Restablece el tamaño original
    });

    fotoDashboardHamburguesa.addEventListener('mouseover', function() {
        // Aumentar el tamaño de la imagen cuando se coloque el cursor sobre ella
        this.style.transform = 'scale(2) translateX(10px)'; // Escala al 110% del tamaño original
        this.style.cursor='pointer'
    });
    
    fotoDashboardHamburguesa.addEventListener('mouseout', function() {
        // Restaurar el tamaño original de la imagen cuando se quite el cursor
        this.style.transform = 'scale(1) translateY(0) ';
         // Restablece el tamaño original
    });
}


async function actulalizarDatos (){
    try {
        const response =await fetch('/datadashboard');
        const data=await response.json()
        const calcularRol  = () => {
            if (data.datosUsuario.rol === 1) {
                return 'ADMIN';
            } else {
                return 'ASOCIADO';
            }
        };
        const sumaAportes=sumatoriaAportes(data.datosaportes);
        const rolMostrar=calcularRol();
        
             // Actualizar los valores en el HTML

             fotoDashboardHamburguesa.src=`/uploads/fotoPerfil/${data.datosPersona.foto_persona}`;
             imagenDashboardSuperior.src=`/uploads/fotoPerfil/${data.datosPersona.foto_persona}`;

             userName.textContent = data.datosPersona.nombre_persona +' '+data.datosPersona.apellido_persona;
             userName1.textContent = data.datosPersona.nombre_persona +' '+data.datosPersona.apellido_persona;
             userName2.textContent = data.datosUsuario.usuario;
             userRol.textContent = rolMostrar;

             cantidadCuentas.textContent=data.datosCuenta.numero_cuenta;
             totalSaldos.textContent=data.datosCuenta.saldo_cuenta;
             promedioRecaudo.textContent=parseInt(data.datosCuenta.aporte_mensual)
             
             totalAportes.textContent=sumaAportes
             

    } catch (error) {
        console.error('Error al obtener los valores:', error);
        
    }


}




