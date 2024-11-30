document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); 

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        sessionStorage.setItem('loggedIn', 'true'); 
        localStorage.setItem('username', username); 

        window.location.href = 'index.html';
    }
});


function saveSession() {
    const username = document.getElementById('username').value;

    localStorage.setItem('username', username);
    document.getElementById('output').textContent = 'Sesión guardada.';
}

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Evita el envío del formulario de manera tradicional

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        sessionStorage.setItem('loggedIn', 'true'); 
        localStorage.setItem('username', username); 

        // actualización del botón dropdown con el email ingresado
        const dropdownButton = document.querySelector('.dropdown-toggle');
        if (dropdownButton) {
            dropdownButton.innerText = username; // Establecemos el texto del botón dropdown
        }

        window.location.href = 'index.html'; 
    }
});

// Login Post usa los datos del body y guarda el token
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault(); 

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;


    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password})
        });

        const data = await response.json();

        if(response.ok) {
            // Guardar el token en localstorage
            localStorage.setItem('token', data.token);
        } else {
            alert('Error: ' + data.message);
        }
    } catch (error) {
        alert('Error de conexión');
    }
});