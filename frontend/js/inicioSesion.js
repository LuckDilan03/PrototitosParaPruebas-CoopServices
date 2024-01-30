async function submitForm(event) {
    event.preventDefault(); // Evitar la acción predeterminada del formulario (la redirección)

    const form = event.target;
    const errorMessageElement = document.getElementById('error-message');

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Usuario: form.Usuario.value,
                Clave: form.Clave.value
            })
        });

        if (!response.ok) {
            throw new Error('Error en el inicio de sesión');
        }

        // Limpiar mensajes de error si todo está bien
        errorMessageElement.textContent = '';

        // Puedes hacer algo adicional con la respuesta si es necesario
    } catch (error) {
        // Mostrar mensaje de error en el elemento
        errorMessageElement.textContent = 'Error en el inicio de sesión. Verifica tus credenciales.';
    }
}
