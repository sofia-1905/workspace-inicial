document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Evita el envío del formulario de manera tradicional

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        sessionStorage.setItem('loggedIn', 'true'); // Guardamos el estado de login
        localStorage.setItem('username', username); // Guardamos el nombre de usuario
        // Omitimos guardar la contraseña por razones de seguridad

        window.location.href = 'index.html';
    }
});

// Función para guardar sesión en localStorage
function saveSession() {
    const username = document.getElementById('username').value;
    // No es necesario guardar la contraseña aquí

    localStorage.setItem('username', username);
    document.getElementById('output').textContent = 'Sesión guardada.';
}