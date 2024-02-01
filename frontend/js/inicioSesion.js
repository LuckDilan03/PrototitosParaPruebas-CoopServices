// login.js
async function submitForm(event) {
    //event.preventDefault();

    const usuario = document.getElementById('Usuario').value;
    const clave = document.getElementById('Clave').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Usuario: usuario, Clave: clave }),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token); // Almacena el token en el almacenamiento local
            window.location.href = '/dashboard'; // Redirige al dashboard
        } else {
            const errorMessage = await response.text();
            document.getElementById('error-message').innerText = errorMessage;
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
}
