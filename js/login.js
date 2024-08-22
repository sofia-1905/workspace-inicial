function iniciarSesion() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        localStorage.setItem('autenticado', 'true');
        window.location.href = 'index.html';
    } else {
        window.location.href ="login.html";
    }
}

function saveSession() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;


    localStorage.setItem('username', username);
    localStorage.setItem('password', password);

    document.getElementById('output').textContent = 'Sesión guardada.';
}



document.addEventListener('DOMContentLoaded', () => {
    // Verificar el estado de autenticación
    const autenticado = localStorage.getItem('autenticado') === 'true';

    if (!autenticado) {
        // Redirigir a login.html si no está autenticado
        window.location.href = 'login.html';
    }
});


