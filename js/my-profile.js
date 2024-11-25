// Activar validación personalizada de Bootstrap
(function () {
    'use strict';

    // Obtener todos los formularios a los que se les aplicará la validación de Bootstrap
    var forms = document.querySelectorAll('.needs-validation');

    // Bucle sobre los formularios y prevenir el envío si es inválido
    Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }

            form.classList.add('was-validated');
        }, false);
    });
})();

document.addEventListener("DOMContentLoaded", function () {
    const profileImage = document.getElementById("profileImage");
    const fileInput = document.getElementById("fileInput");
    const profileForm = document.getElementById("profileForm");

    // Cargar imagen de perfil desde localStorage si existe
    const storedImage = localStorage.getItem("profileImage");
    if (storedImage && profileImage) {
        profileImage.src = storedImage;
    }

    // Manejar el cambio de la imagen
    if (fileInput) {
        fileInput.addEventListener("change", function (event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    // Mostrar la imagen seleccionada en la vista previa
                    if (profileImage) {
                        profileImage.src = e.target.result;
                    }

                    // Guardar la imagen en localStorage
                    localStorage.setItem("profileImage", e.target.result);
                };
                reader.readAsDataURL(file); // Leer el archivo como Data URL
            }
        });
    }

    // Guardar otros datos del formulario en localStorage
    if (profileForm) {
        profileForm.addEventListener("submit", function (event) {
            // Validar formulario
            if (!profileForm.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
                profileForm.classList.add('was-validated');
                return;
            }

            // Mostrar mensaje de éxito
            const successMessage = document.getElementById('successMessage');
            if (successMessage) {
                successMessage.style.display = 'block';
            }
        });
    }
});

// Asocia el clic en el texto "Editar foto de perfil" al input de tipo file
document.getElementById('editProfileText').addEventListener('click', function () {
    document.getElementById('fileInput').click();
});

// Cambia la imagen de perfil cuando se selecciona un archivo
document.getElementById('fileInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('profileImage').src = e.target.result; // Cambia la imagen
        };
        reader.readAsDataURL(file); // Lee el archivo seleccionado como una URL de datos
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const username = localStorage.getItem('username');
    const dropdownButton = document.querySelector('.dropdown-toggle');
    const usernamePlaceholder = document.getElementById('username-placeholder');

    if (dropdownButton) {
        dropdownButton.innerText = username ? username : 'Invitado';
    }

    if (usernamePlaceholder) {
        usernamePlaceholder.innerText = username ? username : ' ';
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const logoutButton = document.getElementById('logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', function () {
            sessionStorage.removeItem('loggedIn');
            localStorage.removeItem('username');
            window.location.href = 'login.html';
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const username = localStorage.getItem('username');

    if (username) {
        const emailField = document.getElementById('email');
        if (emailField) {
            emailField.value = username;
        }

        const dropdownButton = document.querySelector('.dropdown-toggle');
        if (dropdownButton) {
            dropdownButton.innerText = username;
        }
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const profileForm = document.querySelector('form');

    profileForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = {
            nombre: document.getElementById('nombre').value,
            segundoNombre: document.getElementById('segundo-nombre').value,
            apellido: document.getElementById('apellido').value,
            segundoApellido: document.getElementById('segundo-apellido').value,
            email: document.getElementById('email').value,
            telefono: document.getElementById('telefono').value
        };

        localStorage.setItem('userProfile', JSON.stringify(formData));

        alert('Datos guardados correctamente.');
    });

    const storedData = JSON.parse(localStorage.getItem('userProfile'));
    if (storedData) {
        document.getElementById('nombre').value = storedData.nombre || '';
        document.getElementById('segundo-nombre').value = storedData.segundoNombre || '';
        document.getElementById('apellido').value = storedData.apellido || '';
        document.getElementById('segundo-apellido').value = storedData.segundoApellido || '';
        document.getElementById('email').value = storedData.email || '';
        document.getElementById('telefono').value = storedData.telefono || '';
    }
});

// Cambiar a modo oscuro al hacer clic
const switchbutton = document.getElementById('switchbutton');
const body = document.body;
let theme = localStorage.getItem('theme');

if (theme === 'dark-mode') {
    body.classList.add('dark-mode');
    switchbutton.checked = true;
} else {
    body.classList.remove('dark-mode');
    switchbutton.checked = false;
}

switchbutton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark-mode');
    } else {
        localStorage.setItem('theme', 'light-mode');
    }
});

function mostrarBadge() {
    const badge = localStorage.getItem('badge');
    const numerocarrito = document.getElementById('badge');
    numerocarrito.textContent = badge || '0';
}

document.addEventListener('DOMContentLoaded', mostrarBadge);
