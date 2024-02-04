async function submitForm(event) {
    event.preventDefault(); // Evitar la acción predeterminada del formulario (la redirección)

    const form = event.target;
    const errorMessageElement = document.getElementById('error-message');


    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                DNI_Persona: form.DNI_Persona.value,
                correo_Persona: form.correo_Persona.value,
                Nombre_Persona: form.Nombre_Persona.value,
                Segundo_Nombre_Persona: form.Segundo_Nombre_Persona.value || null,
                Apellido_Persona: form.Apellido_Persona.value,
                Segundo_Apellido_Persona: form.Segundo_Apellido_Persona.value || null,
                Direccion_Persona: form.Direccion_Persona.value,
                Telefono_Persona: form.telefono_persona.value,
                Documento_Solicitud: form.Documento_Solicitud.value,
                usuario_deseado: form.usuario_deseado.value,
                Contrasena_deseada: form.Contrasena_deseada.value

            })
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