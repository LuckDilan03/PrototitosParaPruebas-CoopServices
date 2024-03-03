
// Función para obtener y actualizar los valores desde el servidor
function actualizarValores() {
    fetch('/api/valores')
        .then(response => response.json())
        .then(data => {
            // Actualizar los valores en el HTML
            document.getElementById('saldo-actual').textContent = '$' + data.saldo_actual;
            document.getElementById('abono-actual').textContent = '$' + data.abono_actual;
            document.getElementById('aporte-mensual').textContent = '$' + data.aporte_mensual;
            document.getElementById('ahorro-total').textContent = '$' + data.ahorro_total;
        })
        .catch(error => {
            console.error('Error al obtener los valores:', error);
        });
}

// Llamar a la función para obtener y actualizar los valores cuando la página se cargue
window.addEventListener('load', actualizarValores);

