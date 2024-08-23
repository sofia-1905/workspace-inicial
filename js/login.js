document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Evita el envío del formulario de manera tradicional

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        localStorage.setItem('loggedIn', 'true');

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


// Función para verificar si hay una sesión guardada
function checkSession() {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    
    if (!username || !password) {
        document.getElementById('output').textContent = `Sesión activa: Usuario: ${username}, Contraseña: ${password}`;
    } else {
        document.getElementById('output').textContent = 'No hay sesión activa.';
    }
}


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

// Función para verificar si hay una sesión guardada
    function checkSession() {
        const username = localStorage.getItem('username');
        const password = localStorage.getItem('password');
        
        if (username && password) {
            document.getElementById('output').textContent = `Sesión activa: Usuario: ${username}, Contraseña: ${password}`;
        } else {
            document.getElementById('output').textContent = 'No hay sesión activa.';
        }
    }

   
