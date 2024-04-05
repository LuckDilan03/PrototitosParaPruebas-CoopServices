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
        const formdniAsociado = parseInt(document.getElementById('floatingInput').value);;
        const formmontoAporte = document.getElementById('monto_aporte').value;
        const selectTipoPago = document.getElementById("Tipo_Pago");
        const selectedValue = selectTipoPago.options[selectTipoPago.selectedIndex].innerText;
        const pagadoAField = document.getElementById("PagadoA").value;
        const fechaAporte = document.getElementById('fecha_aporte').value;
        const fileInput = document.getElementById('fileInputComprobante').files[0]; // Obtener el archivo adjunto
        

        
        console.log(formdniAsociado)
        console.log(typeof(formdniAsociado))
        // Crear un objeto FormData
        const formData = new FormData();
        formData.append('dni', formdniAsociado);
        formData.append('montoAporte', formmontoAporte);
        formData.append('tipoPago', selectedValue);
        formData.append('pagadoA', pagadoAField);
        formData.append('fechaAporte', fechaAporte);
        formData.append('fileInputComprobante', fileInput); // Adjuntar el archivo
        
        // Enviar los datos mediante fetch
        try {
            const response = await fetch('/registrarAporte', {
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
