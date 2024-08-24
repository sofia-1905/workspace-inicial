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

 // Verificar si hay una sesión activa
 function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}


document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.querySelector("loginForm");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const togglePassword = document.getElementById("togglePassword");


    // Mostrar/ocultar la contraseña
    togglePassword.addEventListener("change", function() {
        passwordInput.type = togglePassword.checked ? "text" : "password";
    });

    // Manejar el envío del formulario
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevenir el envío del formulario

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        console.log("Formulario enviado.");

        // Validar que los campos no estén vacíos
        if (username === "" || password === "") {
            alert("Por favor, complete todos los campos.");
            return;
        }
        
         //COOKIES
        // Guardar la sesión en una cookie
        document.cookie = `sessionUser=${username}; path=/;`;


        // Redirigir al usuario a la página de inicio (o cualquier otra)
        window.location.replace("index.html");
    });
});

