document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Evita el envío del formulario de manera tradicional

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        sessionStorage.setItem('loggedIn', 'true');
        window.location.href = 'index.html';
    } else {
        window.location.href = 'login.html';
    }
});

 // Función para guardar sesión en localStorage
 function saveSession() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    localStorage.setItem('username', username);
    localStorage.setItem('password', password);

    document.getElementById('output').textContent = 'Sesión guardada.';
}



