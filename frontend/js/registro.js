async function submitForm(event) {
    event.preventDefault(); // Evitar la acción predeterminada del formulario (la redirección)

    const form = event.target;
    const errorMessageElement = document.getElementById('error-message');


    try {
        const formData = new FormData(form);
        const response = await fetch('/register', {
            method: 'POST',
            headers: {},  // No necesitas establecer 'Content-Type' para FormData
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Error en el registro');
        }

        // Limpiar mensajes de error si todo está bien
        errorMessageElement.textContent = '';

        // Puedes hacer algo adicional con la respuesta si es necesario
    } catch (error) {
        // Mostrar mensaje de error en el elemento
        errorMessageElement.textContent = 'Error en el registro. Verifica tus datos e intenta nuevamente.';
    }
}