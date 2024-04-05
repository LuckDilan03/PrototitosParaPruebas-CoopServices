document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInputComprobante');
    const formFile = document.getElementById('formFile');

    fileInput.addEventListener('change', () => {
        const fileName = fileInput.files[0].name;
        formFile.textContent = fileName;
    });

    // Calcular la fecha del último mes
    const today = new Date();
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());


    // Inicializar Flatpickr
    flatpickr('#fecha_aporte', {
        enableTime: true, // Habilitar selección de tiempo
        dateFormat: 'Y-m-d H:i:S.u', // Formato de fecha y hora
        time_24hr: true, // Usar formato de 24 horas
        minDate: lastMonth, // Fecha mínima permitida (el ultimo mes)
        locale: {
            firstDayOfWeek: 1, // Lunes como primer día de la semana
        }
    });
});

    function showInputField() {
        var selectElement = document.getElementById("Tipo_Pago");
        var selectedValue = selectElement.options[selectElement.selectedIndex].value;
        var pagadoAField = document.getElementById("pagadoAField");
        
        // Si se selecciona Efectivo (value=5), mostrar el campo "Pagado A", de lo contrario, ocultarlo.
        if (selectedValue === "5") {
            pagadoAField.style.display = "block";
        } else {
            pagadoAField.style.display = "none";
        }
    }

    async function registrarAporte() {
        const formdniAsociado = document.getElementById('floatingInput').value;
        const formmontoAporte = document.getElementById('monto_aporte').value;
        const selectTipoPago = document.getElementById("Tipo_Pago");
        const selectedValue = selectTipoPago.options[selectTipoPago.selectedIndex].value;
        const pagadoAField = document.getElementById("pagadoAField").value;

        // Obtener valores de fecha y hora
        const fechaAporte = document.getElementById('fecha_aporte').value;
        const horaAporte = document.getElementById('hora_aporte').value;

        // Obtener fecha y hora actuales
        const fechaActual = new Date();
        const fechaHoraActual = fechaActual.toISOString().slice(0, 19);

        // Construir objeto con datos a enviar
        const data = {
            dniAsociado: formdniAsociado,
            montoAporte: formmontoAporte,
            tipoPago: selectedValue,
            pagadoA: pagadoAField,
            fechaHoraAporte: fechaAporte + ' ' + horaAporte || fechaHoraActual
        };

        // Enviar datos por POST (aquí deberías agregar tu lógica para enviar los datos al servidor)
        console.log(data);
    }
