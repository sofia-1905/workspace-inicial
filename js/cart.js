document.addEventListener("DOMContentLoaded", function() {
    const username = localStorage.getItem('username');
    if (username) {
        document.getElementById('username-placeholder').innerText = username;
    } else {
        document.getElementById('username-placeholder').innerText = 'Invitado';
    }
});