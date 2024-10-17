// Activar validación personalizada de Bootstrap
(function () {
    'use strict'

    // Obtener todos los formularios a los que se les aplicará la validación de Bootstrap
    var forms = document.querySelectorAll('.needs-validation')

    // Bucle sobre los formularios y prevenir el envío si es inválido
    Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }

            form.classList.add('was-validated')
        }, false)
    })
})()

document.addEventListener("DOMContentLoaded", function () {
    const profileImage = document.getElementById("profileImage");
    const fileInput = document.getElementById("fileInput");

    // Cargar imagen de perfil desde localStorage si existe
    const storedImage = localStorage.getItem("profileImage");
    if (storedImage) {
        profileImage.src = storedImage;
    }

    // Manejar el cambio de la imagen
    fileInput.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                // Mostrar la imagen seleccionada en la vista previa
                profileImage.src = e.target.result;

                // Guardar la imagen en localStorage
                localStorage.setItem("profileImage", e.target.result);
            };
            reader.readAsDataURL(file); // Leer el archivo como Data URL (base64)
        }
    });

    // Guardar otros datos del formulario en localStorage
    const profileForm = document.getElementById("profileForm");
    profileForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Evitar recarga

        // Validar formulario
        if (!profileForm.checkValidity()) {
            event.stopPropagation();
            profileForm.classList.add('was-validated');
            return;
        }

        // Aquí puedes agregar la lógica para guardar otros datos del formulario en localStorage
        document.getElementById('successMessage').style.display = 'block';
    });
});

// Asocia el clic en el texto "Editar foto de perfil" al input de tipo file
document.getElementById('editProfileText').addEventListener('click', function() {
    document.getElementById('fileInput').click();
});

// Cambia la imagen de perfil cuando se selecciona un archivo
document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profileImage').src = e.target.result; // Cambia la imagen
        };
        reader.readAsDataURL(file); // Lee el archivo seleccionado como una URL de datos
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const username = localStorage.getItem('username');
    const dropdownButton = document.querySelector('.dropdown-toggle');
    if (username) {
        dropdownButton.innerText = username; 
        document.getElementById('username-placeholder').innerText = username;
    } else {
        dropdownButton.innerText = 'Invitado';
        document.getElementById('username-placeholder').innerText = ' ';
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const logoutButton = document.getElementById('logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            sessionStorage.removeItem('loggedIn');
            localStorage.removeItem('username');
            window.location.href = 'login.html'; 
        });
    }
});
