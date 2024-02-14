async function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      alert(`Error: ${errorData.error}`);
    } else {
      const responseData = await response.json();
      // Haz lo que necesites con el token, por ejemplo, redirigir a otra página
      window.location.href = '/admin';
      console.log({responseData});
    }
  } catch (error) {
    console.error('Error en la autenticación:', error);
    alert('Error en la autenticación. Por favor, inténtalo de nuevo.');
  }
}