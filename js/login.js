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


    