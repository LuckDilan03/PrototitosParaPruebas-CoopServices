document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('employee-form');
    const message = document.getElementById('message');

    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        // Obtener los valores de los campos del formulario
        const formData = new FormData(form);
        const formValues = Object.fromEntries(formData.entries());

        // Realizar una solicitud al servidor para registrar el empleado
        try {
            const response = await fetch('registrar_empleado.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValues),
            });

            const data = await response.json();
            message.textContent = data.message;
        } catch (error) {
            console.error('Error:', error);
            message.textContent = 'Ocurrió un error al registrar el empleado.';
        }
    });
});
