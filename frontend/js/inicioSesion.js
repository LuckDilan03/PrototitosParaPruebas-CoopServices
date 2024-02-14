async function login() {
    const Usuario = document.getElementById('Usuario').value;
    const Clave = document.getElementById('Clave').value;
  
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Usuario, Clave }),
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
async function login() {
  const Usuario = document.getElementById('Usuario').value;
  const Clave = document.getElementById('Clave').value;

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Usuario, Clave }),
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
