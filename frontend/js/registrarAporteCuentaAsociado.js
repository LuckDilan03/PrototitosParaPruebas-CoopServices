document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInputComprobante');
    const formFile = document.getElementById('formFile');

    fileInput.addEventListener('change', () => {
        const fileName = fileInput.files[0].name;
        formFile.textContent = fileName;
    });

    // Calcular la fecha del último mes
    const lasttoday = new Date();
    const lastMonth = new Date(lasttoday.getFullYear(), lasttoday.getMonth() - 1, lasttoday.getDate());

    // Obtener la fecha y hora actual
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();
    const currentHour = today.getHours();
    const currentMinute = today.getMinutes();


    // Inicializar Flatpickr
    flatpickr('#fecha_aporte', {
        enableTime: true, // Habilitar selección de tiempo
        dateFormat: 'Y-m-d H:i', // Formato de fecha y hora
        time_24hr: true, // Usar formato de 24 horas
        minDate: lastMonth, // Fecha mínima permitida (el ultimo mes)
        maxDate: new Date(currentYear, currentMonth, currentDay, currentHour, currentMinute), // Fecha y hora máximas (actual)
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
        
        const formmontoAporte = document.getElementById('monto_aporte').value;
        const selectTipoPago = document.getElementById("Tipo_Pago");
        const selectedValue = selectTipoPago.options[selectTipoPago.selectedIndex].innerText;
        const pagadoAField = document.getElementById("PagadoA").value;
        const fechaAporte = document.getElementById('fecha_aporte').value;
        const fileInput = document.getElementById('fileInputComprobante').files[0]; // Obtener el archivo adjunto
        const detallesAporte=document.getElementById('detallesAporte').value;


        // Crear un objeto FormData
        const formData = new FormData();
        formData.append('montoAporte', formmontoAporte);
        formData.append('tipoPago', selectedValue);
        formData.append('pagadoA', pagadoAField);
        formData.append('fechaAporte', fechaAporte);
        formData.append('fileInputComprobante', fileInput); // Adjuntar el archivo
        formData.append('detalles',detallesAporte);
        
        // Enviar los datos mediante fetch
        try {
            const response = await fetch('/registrarAporteAsociado', {
                method: 'POST',
                body: formData
            });
            const resJson= await response.json();
            if (!response.ok) {
                alert(resJson.message);
                window.location.href = "/registrarAporte"
            } else{
                alert(resJson.message);
                window.location.href = "/registrarAporte"    
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    }
