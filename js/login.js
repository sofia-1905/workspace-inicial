    // Añade un evento al formulario que se ejecuta al enviarlo
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault(); // Evita el envío del formulario de manera tradicional

        // Obtiene los valores de los campos de usuario y contraseña
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Verifica que ambos campos no estén vacíos
        if (username && password) {
            // Guarda el estado de autenticación en sessionStorage
            sessionStorage.setItem('loggedIn', 'true');
            // Redirige al usuario a la página de productos
            window.location.href = 'index.html';
        }
    });