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
    e.preventDefault(); 

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        sessionStorage.setItem('loggedIn', 'true'); 
        localStorage.setItem('username', username); 

        // actualización del botón dropdown con el email ingresado
        const dropdownButton = document.querySelector('.dropdown-toggle');
        if (dropdownButton) {
            dropdownButton.innerText = username; 
        }

        window.location.href = 'index.html'; 
    }
});
