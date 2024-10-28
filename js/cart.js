document.addEventListener("DOMContentLoaded", function() {
    const username = localStorage.getItem('username');
    if (username) {
        document.getElementById('username-placeholder').innerText = username;
    } else {
        document.getElementById('username-placeholder').innerText = 'Invitado';
    }
});

// Modo Oscuro
const theme = localStorage.getItem('theme');

// Aplicar el tema guardado al cargar la página
if (theme === 'dark-mode') {
    document.body.classList.add('dark-mode');
} else {
    document.body.classList.remove('dark-mode');
}