function iniciarSesion() {
    // Obtener valores del formulario
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        // Guardar estado de autenticación en localStorage
        localStorage.setItem('autenticado', 'true');
        
        // Redirigir al usuario a la página principal
        window.location.href = 'index.html';
    } else {
        document.getElementById('output').textContent = 'Los datos ingresados no son válidos';
    }
}


document.addEventListener('DOMContentLoaded', () => {
    // Verificar el estado de autenticación
    const autenticado = localStorage.getItem('autenticado') === 'true';

    if (!autenticado) {
        // Redirigir a login.html si no está autenticado
        window.location.href = 'login.html';
    }
});


