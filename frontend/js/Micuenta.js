document.addEventListener('DOMContentLoaded', () => {
    obtenerDatosCuenta();
});

async function obtenerDatosCuenta() {
    try {
        const response = await fetch('/obtenerDatosCuenta');
        const datosCuenta = await response.json();
        llenarInformacionPersonal(datosCuenta);
        llenarInformacionCuenta(datosCuenta);
        llenarTablaPlanPago(datosCuenta);

        // Inicializar las tablas con DataTables y habilitar la ordenación
        $('#planPagoTable').DataTable({
            "paging": false, // Deshabilitar la paginación
            "searching": false, // Deshabilitar la búsqueda
            "info": false // Deshabilitar la información de la tabla
        });
    } catch (error) {
        console.error('Error al obtener los datos de la cuenta:', error);
    }
}

function llenarInformacionPersonal(datosCuenta) {
    document.getElementById('nombre').innerText = datosCuenta.nombre;
    // Agregar el resto de la información personal aquí
}

function llenarInformacionCuenta(datosCuenta) {
    document.getElementById('tipoCuenta').innerText = datosCuenta.tipoCuenta;
    // Agregar el resto de la información de la cuenta aquí
}

function llenarTablaPlanPago(datosCuenta) {
    const tbody = document.querySelector('#planPagoTable tbody');

    datosCuenta.planPago.forEach(cuota => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td><input class="form-check-input" type="checkbox"></td>
            <td>${cuota.numeroCuota}</td>
            <td>${cuota.cuotaMensual}</td>
            <td>${cuota.abonoCapital}</td>
            <td>${cuota.abonoIntereses}</td>
            <td>${cuota.saldoCapital}</td>
            <td>${cuota.totalCuota}</td>
        `;
        tbody.appendChild(fila);
    });
}
