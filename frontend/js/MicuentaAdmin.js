const userName=document.getElementById('userName');
const userName1=document.getElementById('userName1');
const userName2=document.getElementById('userName2');
const userRol=document.getElementById('userRol');
const fotoDashboardHamburguesa=document.getElementById('fotoDashboardHamburguesa');
const imagenDashboardSuperior=document.getElementById('imagenDashboardSuperior');
const cantidadCuentas=document.getElementById('cantidad-cuentas');
const totalSaldos=document.getElementById('total-saldos');
const promedioRecaudo=document.getElementById('promedio-recaudo');
const totalAportes=document.getElementById('total-aportes');




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
    console.log(sumaAportes)
    return sumaAportes;
}

function eventos(){

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
    });
    
    fotoDashboardHamburguesa.addEventListener('mouseout', function() {
        // Restaurar el tamaño original de la imagen cuando se quite el cursor
        this.style.transform = 'scale(1) translateY(0) '; // Restablece el tamaño original
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
             console.log(sumaAportes)
             totalAportes.textContent=sumaAportes
             

    } catch (error) {
        console.error('Error al obtener los valores:', error);
        
    }


}




